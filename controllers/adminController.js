const Admin = require('../model/schema')
const {issueToken} = require('../lib/jwt')
const {checkToken, validatePassword} = require('../lib/utils')

async function signup(req, res){
    const {username, password, token} = req.body
    try{
        const newAdmin = Admin({
            username,
            password
        })

        const isValidToken = checkToken(token)

        if(!isValidToken) return res.json({
            success: false,
            message: 'wrong token'
        })

        await newAdmin.save()
        const jwtToken = issueToken(newAdmin)
        res.cookie('jwt', jwtToken, {maxAge: 1000*60*15, httpOnly: true})
        res.json({
            success: true
        })
    }catch(err){
        console.log(err)
        if(err) return res.json({
            success: false,
            message:'error!!'
        })
    }
}

async function login(req, res){
    const {username, password} = req.body
    try{
        const admin = await Admin.findOne({username})
        if(!admin) return res.json({
            success: false,
            message: 'no admin found'
        })
        const isAdmin = validatePassword(password, admin.password)
        if(!isAdmin) return res.json({
            success: false,
            message: 'wrong password'
        })

        const jwtToken = issueToken(admin)
        res.cookie('jwt', jwtToken, {maxAge: 1000* 60* 15, httpOnly: true})
        res.json({
            success: true
        })

    }catch(err){
        return res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function deleteAdmin(req, res){
    const {username, password, token} = req.body
    try{
        const admin = await Admin.findOne({username})
        if(!admin) return res.json({
            success: false,
            message: 'no admin found'
        })

        const isAdmin = validatePassword(password, admin.password)
        const isValidToken = checkToken(token)

        if(!isValidToken) return res.json({
            success: false,
            message: 'wrong token'
        })
        if(!isAdmin) return res.json({
            success: false,
            message: 'wrong password'
        })

        await Admin.deleteOne({username})
        return res.json({
            success: true
        })
    }catch(err){
        if(err) return res.json({
            success: false,
            message: 'error!!'
        })
    }
}

module.exports = {
    login,
    signup,
    deleteAdmin
}
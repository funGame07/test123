const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT

//connect
require('./model/connect')

//config
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true
}))

//routing
app.use('/', require('./routes/main-route'))

app.listen(3000, () => console.log('server is listening on port ' + PORT))
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/auth')

// MiddleWares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routs
app.use('/api', authRoute)


// DataBase Cnnection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log("DB CONNECTED SUCCESSFULL")
}).catch(err =>{
    console.log(`NOT CONNECTED, ERROR => ${err}`)
})


// Start Server and Listening Port
const port = process.env.PORT ||8000;
app.listen(port, ()=>{
    console.log(`App is runing at port ${port}`)
})


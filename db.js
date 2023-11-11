const mongoose =  require("mongoose");

require('dotenv').config();

const mongoURL = process.env.MONGODB_URI; 

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error',()=>{

    console.log('mongo DB connection failded')

})

connection.on('connected',()=>{

    console.log('mongo DB connection success')
    
})

module.exports = mongoose;
let mongoose = require('mongoose')
require('dotenv').config()
let url = process.env.URL
mongoose.connect(url)
.then((data)=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log("Error", err)
})
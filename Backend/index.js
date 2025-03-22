let express = require ('express')
let cors = require('cors')
require('dotenv').config()
require('./dbConnect')
const userRouter = require('./Router/UserRouter')

let app = express()
app.use(express.json())
app.use(cors())
app.use("/", userRouter)

app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log("Server started on", process.env.PORT)
    }else{
        console.log(err)
    }
})
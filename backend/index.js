const express = require("express")
const dotEnv = require("dotenv")
const bodyParser = require("body-parser")
const mongoose =require("mongoose")
const vendorRoutes=require("./routes/vendorRoutes")
const path=require("path")
const cors = require("cors");

const app=express()

const PORT=process.env.PORT || 4000
dotEnv.config()
app.use(bodyParser.json())

app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB connected successfully!")
})
.catch((error)=>{
    console.log(`Error: ${error}`)
})

app.use("/vendor",vendorRoutes)




app.listen(PORT,()=>{
    console.log(`server is running on Port: ${PORT}`)
})

const express = require("express");  //import express
const cors = require("cors");  //import cors
const mongoose = require("mongoose");  //import mongoose
const userRoute =  require("./Routes/userRoutes")
const app = express();  //to add middleware

require("dotenv").config();

app.use(express.json()) //allows to use json data
app.use(cors()) //for communication

app.use("/api/users", userRoute)
//CRUD operations
app.get("/", (req, res)=>{
res.send("welcome on our chat app")
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (request , resposne) =>{
  console.log(`Server is running on : ${port}`)
})

mongoose.connect(uri,{
// useNewUrlParser : true,
// useUnifiedTopology : true
}).then(()=> console.log("Database initialized ")).catch((error)=> console.log("ERROR: ",error.message))
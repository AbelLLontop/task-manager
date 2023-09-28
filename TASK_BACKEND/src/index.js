require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./handler/error");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/images"));

app.use("/api",require("./routes"));
app.use('*',(req,res)=>{
    res.send("404 Page Not Found")
})
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log("Server is running on port http://localhost:"+PORT)
})

connectDB();
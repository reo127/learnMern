const express = require("express");
const app = express();
const port = 8000;

// mongodb+srv://rohan:kankimagi@cluster0.ecwot4i.mongodb.net/?retryWrites=true&w=majority

app.get("/", (req, res) => {
    return res.send("Hallo Wrold");
})

app.get("/login", (req, res) => {
    return res.send("Hallo , You are in Loign Route");
})

app.get("/singup", (req, res) => {
    return res.send("Hallo , You are in Singup Route");
})



app.listen(port, ()=> {
    console.log("Server is running at port " + port )
})
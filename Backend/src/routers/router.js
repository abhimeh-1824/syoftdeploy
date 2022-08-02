const express = require("express")
const cors = require("cors")
const {registration,login} = require("../Authentication/user")
const app = express();
// middlewares
app.use(express.json())
app.use(cors())
// app.use("/passwordchange",auth_middleware)
app.get("/registration",(req,res)=>{
    console.log(hii)
});
app.post("/registration",registration);
app.post("/login",login)
module.exports = app
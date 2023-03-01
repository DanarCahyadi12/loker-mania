const express = require("express")
const router = require("./routes/route")
const { urlencoded } = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express()

app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use("/",router)


app.listen(8000,()=> {
    console.log("SERVER IS RUNNING")
})
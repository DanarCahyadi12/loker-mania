const conn = require("../connection")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const SR = 10


//Register
let massages = ""
const CheckNameAndEmail = (name,email,cb) => { // function for check an email and username is already exits
    let sql = 'SELECT company_name FROM company WHERE company_name = ? OR email = ?'
    conn.query(sql,[name,email],(err,data) => {
        if(err) throw err
        if(data.length > 0) {
            cb(true,"Nama perusahaan atau email sudah sudah terdaftar.")
        }else{
            cb(false)
        }
    })
}
const CheckPassword = (password) => { //function for checking length password
    if (password.length <= 8 ){
        massages = "Length password is less than 8"
        return false
    }
    return true
}
const InsertIntoDatabase = (name,email,password,provinsi,address,phone,description,photo_path,res) => { //function for insert form data into database
    const sql = "INSERT INTO company (company_name,email,password,provinsi,address,phone,description,photo_path) VALUES(?,?,?,?,?,?,?,?)"
    conn.query(sql,[name,email,password,provinsi,address,phone,description,photo_path],(err,data) => {
        if(err) throw err
        return  res.status(200).json({
            massage : "Register succes",
            data ,
            redirect : "/login"
        })

    })
}
const Register = (req,res,next) => { //main function for register
    const {name,email,password,provinsi,address,phone,description,photo_path} = req.body
    CheckNameAndEmail(name,email,(exits,massage) => { // Name and email validation
        if(!exits && CheckPassword(password)) {
            bcrypt.genSalt(SR,(err,salt) => { //generate salt for hashing password
                if(err) throw err
                bcrypt.hash(password,salt,(err,hash) => {
                    if(err) throw err
                    InsertIntoDatabase(name,email,hash,provinsi,address,phone,description,photo_path,res)
                   
                })
            })
         
        }else if(exits){ // if name or email already exits
            return res.status(409).json({
                massage :massage
            })
        }else if(!CheckPassword(password)) { // if length password less than 8
            return res.status(409).json({
                massage :massages
            })
        }
    })
}
//End of register 

//Login
const GetDataAndCompare  = (email,password,passwordCompare,res) => { //function for get data from database and compare hashed password
    let sql = "SELECT * FROM company WHERE email = ? "
    conn.query(sql,[email],(err,data) => {
        if(err) throw err
        if(data.length > 0 ) passwordCompare(password,data[0].password,data[0]) 
        else return res.status(403).json({massage : "Email atau password salah"})
    })      

}

const SetTokenAuth = (data) => {
    const dataUser = {
        id : data.id,
        name: data.company_name

    }
    const token = jwt.sign({
        dataUser
    },process.env.TOKEN_SECRET)
    return token

}
const Login = (req,res) => {
    const {email,password} = req.body
    GetDataAndCompare(email,password, async function(plainTextPass,hashedPass,data) {
        let result = await bcrypt.compare(plainTextPass,hashedPass)
        if(!result){
            return res.json({massage : "Email atau password salah"})
        } 
        else{
            let token = SetTokenAuth(data)
            res.cookie('userToken',token,{
                httpOnly : true,
                secure : true
            })
        } 
    },res)

}

module.exports = {Login,Register}
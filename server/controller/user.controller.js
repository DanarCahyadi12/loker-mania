const conn = require("../connection")
const {SetTokenAuth,DecodeJWT} = require("../middleware/jwt")
const bcrypt = require("bcrypt")
const SR = 10


//Register
let massages = ""
const CheckNameAndEmail = (name,email,cb) => { // function for check an email and username is already exits
    let sql = 'SELECT company_name FROM company WHERE company_name = ? OR email = ?'
    conn.query(sql,[name,email],(err,data) => {
        if(err) throw err
        if(data.length > 0) {
            cb(true,"Name of company or email already exits.")
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
    let fixName = name.trim()
    conn.query(sql,[fixName,email,password,provinsi,address,phone,description,photo_path],(err,data) => {
        if(err) throw err
        if(!data.affectedRows) return res.status(500).json({massage : "Something wrong please try again",status : 500})
        res.status(200).json({
            massage : "Register succes",
            status :200,
            data ,
        })

    })
}
const Register = (req,res) => { //main function for register
    const {name,email,password,verify,provinsi,address,phone,description,photo_path} = req.body
    if(password !== verify) return res.status(400).json({massage : "Verifikasi password tidak valid"})
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
                massage :massage,
                status :403

            })
        }else if(!CheckPassword(password)) { // if length password less than 8
            return res.status(409).json({
                massage :massages,
                status :403
            })
        }
    })
}
//End of register 

//Login
const GetDataAndCompare  = (email,password,passwordCompare,res) => { //function for get data from database and compare hashed password
    let sql = "SELECT * FROM company WHERE email = ?"
    conn.query(sql,[email],(err,data) => {
        if(err) throw err
        if(data.length > 0 ) passwordCompare(password,data[0].password,data[0]) 
        else res.status(403).json({massage : "Email atau password salah",status :403,auth : false})
    })      

}

const Login = (req,res) => {
    const {email,password} = req.body
        GetDataAndCompare(email,password, function(plainTextPass,hashedPass,data) {
            bcrypt.compare(plainTextPass,hashedPass,(err,result) => {
                if(err) throw err
                if(!result){
                    return res.status(403).json({massage : "Email atau password salah",status :403,auth : false})
                }else{
                    let token = SetTokenAuth(data)
                    res.cookie('userToken',token,{
                    httpOnly : true
                })
    
                return res.status(200).json({
                    massage : "Login succesfully",
                    status : 200,
                    auth : true,
                    token : token
                })
              } 
            })
           
        },res)

}

const Logout = (req,res) => {
    res.clearCookie('userToken')
    return res.status(200).json({massage : "Logout succesfully",status :200})
}

module.exports = {Login,Register,Logout }
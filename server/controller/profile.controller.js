const {DecodeJWT} = require("../middleware/jwt")
const conn = require("../connection")
const GetProfileCompany = (req,res) => {
    let token = DecodeJWT(req,res) 
    res.status(200).json(token)
}
const UpdateProfile = (req,res) => {
    let token = DecodeJWT(req,res)
    const {name,provinsi,address,phone,description,} = req.body
    let sql = "UPDATE company SET company_name = ? ,provinsi = ? ,address = ? ,phone = ?,  description = ? WHERE idcompany = ?"
    if(!name) return res.status(400).json({massage : "Company name is required",status : 400})
    if(!address) return res.status(400).json({massage : "Address  is required",status : 400})
    if(!phone) return res.status(400).json({massage : "Phone number name is required",status : 400})
    conn.query(sql,[name.trim(),provinsi,address,phone,description,token.id],(err,result) => {
        if(err) throw  err
        if(!result.affectedRows) return res.status(500).json({massage : "Something wrong.Please try again",status : 500})
        res.status(200).json({massage : "Update profile succesfully",status : 200})
    })

}
module.exports ={GetProfileCompany,UpdateProfile}
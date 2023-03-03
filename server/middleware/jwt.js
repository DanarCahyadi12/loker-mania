const jwt = require("jsonwebtoken")
const jwtDecoder = require("jwt-decode")

const DecodeJWT = (req,res) => {
    const token = req.cookies['userToken']
    const decoded = jwtDecoder(token)
    return decoded
}
const SetTokenAuth = (data) => {
    const dataUser = {
            id : data.idcompany,
            name: data.company_name,
            email : data.email,
            provinsi : data.provinsi,
            address : data.address,
            phone : data.phone,
            description : data.description,
            photo : data.photo_path
    }
    const token = jwt.sign(dataUser,process.env.TOKEN_SECRET)
    
    return token

}
const UserAuth = (req,res,next) => {
    const token = req.cookies['userToken']
    if(!token) return res.status(400).redirect('/login')
    try {
        isValid = jwt.verify(token,process.env.TOKEN_SECRET)
        if(isValid) {
            return next()
        }
    }catch(err) {
        res.status(403).json({massage : err})
    }
    
}

module.exports = {UserAuth,SetTokenAuth,DecodeJWT}
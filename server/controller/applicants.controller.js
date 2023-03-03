const conn = require("../connection")
const {DecodeJWT} = require("../middleware/jwt")



//Get list applicants
const GetListApplicants = (req,res) => {
    let sql  = "SELECT applicants.idapplicants,applicants.full_name,applicants.email,applicants.address,applicants.phone,applicants.age,applicants.gender,applicants.cv_path FROM applied_job INNER JOIN applicants ON applicants.idapplicants = applied_job.fk_applicants WHERE fk_job = ?"
    let decoded =  DecodeJWT(req,res)
    conn.query(sql,decoded.id,(err,result) => {
        if(err) return err
        if(result.length > 0 ) return res.status(200).json({massage : "Get data succesfully",status : 200,result})
        else res.status(200).json({massage : "No applicants here ",status: 200, data : []})
    })
}

const GetSpecifyApplicants = (req,res) => {
    let id = req.params.id
    let sql = "SELECT "
}
//End of list applicants

//Apply job
const InsertApplicants = (data,id,cbApplicants) => {//function for insert data to applicants tabel
    let sqlApplicants = "INSERT INTO applicants (full_name,email,address,phone,age,gender,cv_path) VALUES (?,?,?,?,?,?,?)"
    conn.query(sqlApplicants,[data.fullName,data.email,data.address,data.phone,data.age,data.gender,data.cv_path],(err,result) => {
        if(err) throw err
        cbApplicants(result)
    } )

}

const InsertApplied = (idApplicants,idJob,cb) => { //function for insert data to applied job tabel
    let date = new Date()
    let month = parseInt(date.getMonth())+1
    let curDate = date.getFullYear()+"-"+month+"-"+date.getDate()
    let sql = "INSERT INTO applied_job (fk_applicants,fk_job,fk_company,date_applied) VALUES (?,?,?)"
    conn.query(sql,[idApplicants,idJob,decoded.id,curDate],(err,result) => {
        if(err) throw err
        cb(result)
    })
}






module.exports = {GetListApplicants,InsertApplicants,InsertApplied,GetListApplicants}
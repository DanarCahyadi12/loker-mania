
const conn = require("../connection")
const {DecodeJWT} = require("../middleware/jwt")



//Get list applicants
const GetListApplicants = (req,res) => {
    let sql  = "SELECT applied_job.id_applied applicants.idapplicants,applicants.full_name,applicants.email,applicants.address,applicants.phone,applicants.age,applicants.gender,applicants.cv_path ,job_list.title AS position_applied FROM applied_job INNER JOIN applicants ON applicants.idapplicants = applied_job.fk_applicants INNER JOIN job_list ON applied_job.fk_job = job_list.idjob_list WHERE applied_job.fk_company = ? ORDER BY applied_job.date_applied DESC"
    let decoded =  DecodeJWT(req,res)
    conn.query(sql,decoded.id,(err,result) => {
        if(err) throw err
        if(result.length > 0 ) return res.status(200).json({massage : "Get data succesfully",status : 200,result})
        else res.status(200).json({massage : "No applicants here ",status: 200, data : []})
    })
}

const DeleteApplicants = (req,res) => {
    let sql = 'DELETE FROM applied_job WHERE fk_applicants = ?'
    let query = 'DELETE FROM applicants WHERE idapplicants = ?'
    const {id} =req.body
    conn.query(sql,id,(err,result) => {
        if(err) throw  err
        if(result.affectedRows == 0) return res.status(500).json({massage : "Something wrong. Please try again",status : 500})
        res.status(200)

        
    })
    conn.query(query,id,(err,result) => {
        if(err) throw err
        if(result.affectedRows == 0) return res.status(500).json({massage : "Something wrong. Please try again",status : 500})
        res.status(200)

    })
}

const GetSpecifyApplicants = (req,res) => {
    let id = req.params.id
    let sql = "SELECT applied_job.id_applied applicants.idapplicants,applicants.full_name,applicants.email,applicants.address,applicants.phone,applicants.age,applicants.gender,applicants.cv_path ,job_list.title as position_applied FROM applied_job INNER JOIN applicants ON applicants.idapplicants = applied_job.fk_applicants INNER JOIN job_list ON applied_job.fk_job = job_list.idjob_list WHERE applied_job.fk_company = ? AND applied_job.fk_applicants = ?"
    let decoded =  DecodeJWT(req,res)
    conn.query(sql,[decoded.id,id],(err,result) => {
        if(err) throw err
        if(result.length > 0 ) return res.status(200).json({massage : "Get specify applicants succesfully",status : 200,result})
        else res.status(404).json({massage : "No applicants here ",status: 404, data : []})
    })

}
//End of list applicants

//Apply job
const InsertApplicants = (data,cbApplicants) => {//function for insert data to applicants tabel
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
    let sql = "INSERT INTO applied_job (fk_applicants,fk_job,fk_company,date_applied) VALUES (?,?,?,?)"
    let query = 'SELECT fk_company FROM job_list WHERE idjob_list = ?'
    conn.query(query,idJob,(err,result) => {
        if(err) throw err
        conn.query(sql,[idApplicants,idJob,result[0].fk_company,curDate],(err,result) => {
            if(err) throw err
            cb(result)
        })
    })
    
}






module.exports = {GetListApplicants,InsertApplicants,InsertApplied,GetListApplicants,GetSpecifyApplicants,DeleteApplicants}
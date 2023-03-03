

const conn = require("../connection")
const {DecodeJWT} = require("../middleware/jwt")
//Add loker
const AddVacancy = (req,res) => {
    let sql = "INSERT INTO job_list (fk_company,title,requirements,description,posted,salary,job_function,graduates,experiences) VALUES(?,?,?,?,?,?,?,?,?)"
    let date = new Date()
    let month = parseInt(date.getMonth())+1
    let curDate = date.getFullYear()+"-"+month+"-"+date.getDate()
    const {title,requirements,description,salary,job_function,graduates,experiences} = req.body
    let decoded =  DecodeJWT(req,res)
    let requirementsConcate = ""
    for (let i = 0; i < requirements.length; i++){
        requirementsConcate += requirements[0]
        if(i != requirements.length-1) {
          requirementsConcate += ","  
        } 
    }
    conn.query(sql,[decoded.id,title,requirementsConcate,description,curDate,salary,job_function,graduates,experiences],(err,data) => {
        if(err) return err
        if(!data.affectedRows) return res.status(500).json({massage : "Something wrong, please try again",status : 500})
    })

     res.status(200).json({massage : "Add a job vacancy succesfully",status:200})
    


}

//End of add loker

//Get all data loker 
const GetVacancyLimited = (req,res) => {
    let sql = "SELECT company.idcompany, company.company_name,company.email,company.provinsi,company.address,company.phone, job_list.idjob_list,job_list.title,job_list.requirements,job_list.description,job_list.posted,job_list.salary,job_list.job_function,job_list.majors,job_list.graduates,job_list.experiences FROM job_list INNER JOIN company ON company.idcompany = job_list.fk_company ORDER BY job_list.posted DESC LIMIT 5"
    conn.query(sql,(err,data) => {
        if(err) throw err
        if(data.length > 0 ) return res.status(200).json({massage : "Get Updated vacancy succesfully",status : 200,data})
        res.status(200).json({massage : "There are no job vacany",status : 200,data : []})
    })

}
//end of data loker

//Get specify vacancy
const GetSpecifyVacancy = (req,res) => {
    let sql = "SELECT * FROM job_list WHERE idjob_list = ?"
    conn.query(sql,[req.params.id] ,(err,data) => {
        if (err) throw err
        if(data.length > 0 ) return res.status(200).json({massage : "Get specify vacancy succesfully",status : 200,data})
        else return res.status(404).json({massage : "No vacancy here ",status: 404})
    })
}
//End specify vacancy


const GetAllVacancy = (req,res) => {
    let sql = "SELECT company.idcompany, company.company_name,company.email,company.provinsi,company.address,company.phone, job_list.idjob_list,job_list.title,job_list.requirements,job_list.description,job_list.posted,job_list.salary,job_list.job_function,job_list.majors,job_list.graduates,job_list.experiences FROM job_list INNER JOIN company ON company.idcompany = job_list.fk_company"
    conn.query(sql,(err,data) => {
        if(err) throw err
        if(data.length > 0 ) return res.status(200).json({massage : "Get all job vacancy succefully",status : 200,data})
        res.status(200).json({massage : "There are no job vacany",status : 200,data : []})
    })
}


module.exports = {AddVacancy,GetVacancyLimited,GetSpecifyVacancy,GetAllVacancy}

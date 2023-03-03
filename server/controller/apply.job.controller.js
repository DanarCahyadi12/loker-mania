const {InsertApplicants,InsertApplied} = require('../controller/applicants.controller')
const {DecodeJWT} = require("../middleware/jwt")

const  ApplyJob = (req,res) => {
    const id = req.params.id
    const decoded = DecodeJWT(req,res)
    InsertApplicants(req.body,(result)=>{
        if(!result.affectedRows)  return res.status(500).json({massage : "Something wrong please try again",status:500})
        InsertApplied(result.insertId,id,(result) => {
            if(!result.affectedRows)  return res.status(500).json({massage : "Something wrong please try again",status:500})
        })
        return res.status(200).json({massage : "Job succesfully applied",status:200})

    })

}
//End of apply job

module.exports  = {ApplyJob}
const { patientModel } = require("../Model/patientModel");
const reportsModel = require("../Model/reportsModel");

async function addReportByDoc(req, res) {

    try {
console.log("object");
        let patientId = req.body.pid;
        let userObj = await patientModel.findById(patientId);
        let doctorId = req.user.id;
        let doctorName = req.user.name;
        console.log(patientId,userObj,doctorId,doctorName);
        let obj = await reportsModel.create({
            patientObj: userObj,
            patientId: patientId,
            doctorId: doctorId,
            doctorName: doctorName,
            department: req.body.department,
            time: req.body.time,
            testName: req.body.testName,
            reportPath: req.body.reportPath
        })

        res.status(200).json({
            mess: "added report successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to add report",
            error: err
        })
    }


}
async function addReportByPatient(req, res) {

    try {

        let patientId = req.id;
        let userObj = req.user;
        let obj = await reportsModel.create({
            patientObj: userObj,
            patientId: patientId,
            department: req.body.department,
            time: req.body.time,
            testName: req.body.testName,
            reportPath: req.body.reportPath
        })

        res.status(200).json({
            mess: "added report successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to add report",
            error: err
        })
    }


}

async function getReportByDoc(req,res){
    try {

        let doctorId = req.id;
        
        let obj = await reportsModel.find({patientId:req.body.pid}).sort({time: -1});
        res.status(200).json({
            mess: "get report successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to get report",
            error: err
        })
    }


}

async function getReportByPatient(req,res){
    try {

        let patientId = req.id;
        let obj = await reportsModel.find({patientId:patientId}).sort({time: -1});
        res.status(200).json({
            mess: "get report successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to get report",
            error: err
        })
    }


}

module.exports.addReportByDoc = addReportByDoc;
module.exports.addReportByPatient = addReportByPatient;
module.exports.getReportByDoc = getReportByDoc;
module.exports.getReportByPatient = getReportByPatient;
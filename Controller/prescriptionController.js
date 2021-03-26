const { patientModel } = require("../Model/patientModel");
const prescriptionModel = require("../Model/prescriptionModel");

async function addPresByDoc(req, res) {

    try {

        let patientId = req.body.pid;
        let userObj = await patientModel.findById(patientId);
        let doctorId = req.user.id;
        let doctorName = req.user.name;
        console.log(req.user);
        let obj = await prescriptionModel.create({
            patientObj: userObj,
            patientId: patientId,
            doctorId: doctorId,
            doctorName: doctorName,
            department: req.user.department,
            time: req.body.time,
            prescriptionPath: req.body.prescriptionPath
        })

        res.status(200).json({
            mess: "added prescription successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to add prescription",
            error: err
        })
    }


}
async function addPresByPatient(req, res) {

    try {

        let patientId = req.id;
        let userObj = req.user;
        let obj = await prescriptionModel.create({
            patientObj: userObj,
            patientId: patientId,
            doctorName:req.body.doctorName,
            department: req.body.department,
            time: req.body.time,
            prescriptionPath: req.body.prescriptionPath
        })

        res.status(200).json({
            mess: "added prescription successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to add prescription",
            error: err
        })
    }


}

async function getPresByDoc(req,res){
    try {

        let doctorId = req.user.id;
        let obj = await prescriptionModel.find({patientId:req.body.pid}).sort({time: -1});
        res.status(200).json({
            mess: "get prescription successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to get prescription",
            error: err
        })
    }


}

async function getPresByPatient(req,res){
    try {

        let patientId = req.id;
        let obj = await prescriptionModel.find({patientId:patientId}).sort({time: -1});
        res.status(200).json({
            mess: "get prescription successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to get prescription",
            error: err
        })
    }


}

module.exports.addPresByDoc = addPresByDoc;
module.exports.addPresByPatient  = addPresByPatient;
module.exports.getPresByDoc = getPresByDoc;
module.exports.getPresByPatient = getPresByPatient;
const EprescriptionModel = require("../Model/e-prescriptionModel");
const { patientModel } = require("../Model/patientModel");


async function addEPresByDoc(req, res) {

    try {

        let patientId = req.body.pid;
        let userObj = await patientModel.findById(patientId);
        let doctorId = req.user.id;
        let doctorName = req.user.name;
        let obj = await EprescriptionModel.create({
            patientObj: userObj,
            patientId: patientId,
            doctorId: doctorId,
            doctorName: doctorName,
            department: req.user.department,
            time: req.body.time,
            problemName:req.body.prob,
            prescription: req.body.prescription
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
async function addEPresByPatient(req, res) {

    try {

        let patientId = req.id;
        let userObj = req.user;
        let obj = await EprescriptionModel.create({
            patientObj: userObj,
            patientId: patientId,
            doctorName:req.body.name,
            department: req.body.department,
            time: req.body.time,
            problemName:req.body.prob,
            prescription: req.body.prescription
        })

        res.status(200).json({
            mess: "added prescription successfully",
            // data: obj
        })
    } catch (err) {
        res.status(500).json({
            mess: "failed to add prescription",
            error: err
        })
    }


}

async function getEPresByDoc(req,res){
    try {

        let doctorId = req.id;
        let obj = await EprescriptionModel.find({patientId:req.body.pid}).sort({time: -1});
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

async function getEPresByPatient(req,res){
    try {

        let patientId = req.id;
        let obj = await EprescriptionModel.find({patientId:patientId}).sort({time: -1});
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

module.exports.addEPresByDoc = addEPresByDoc;
module.exports.addEPresByPatient  = addEPresByPatient;
module.exports.getEPresByDoc = getEPresByDoc;
module.exports.getEPresByPatient = getEPresByPatient;
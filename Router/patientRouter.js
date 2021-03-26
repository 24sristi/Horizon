const express = require("express");
const { getDoctor } = require("../Controller/doctorController");
const patientRouter = express.Router();
const { addEPresByPatient, getEPresByPatient } = require("../Controller/EprescriptionController");
const { acceptRequest, getfollowers, unfollow, getPendingRequest, cancelRequest } = require("../Controller/followerController");

const { patientLogin, patientSignup, updatePatientProfilePhoto, updateDetails, PatientisLoggedIn } = require("../Controller/patientController");
const { addPresByPatient, getPresByPatient } = require("../Controller/prescriptionController");
const { addReportByPatient, getReportByPatient } = require("../Controller/reportController");
const { logout, protectRoute } = require("../Controller/userController");

patientRouter.post("/signup", patientSignup);
patientRouter.post("/login", patientLogin);
patientRouter.post("/logout", logout)

patientRouter.use(protectRoute);
patientRouter.patch("/updateprofilephoto", updatePatientProfilePhoto);
patientRouter.post("/comfirmReq",acceptRequest);
patientRouter.post("/getFollowers",getfollowers)
patientRouter.post("/getPendingReq",getPendingRequest)
patientRouter.post("/unfollow",unfollow);
patientRouter.post("/cancel", cancelRequest);
patientRouter.patch("/updateDetails",updateDetails);

patientRouter.use(PatientisLoggedIn);
patientRouter.post("/addReport",addReportByPatient);
patientRouter.post("/getReport",getReportByPatient);

patientRouter.post("/addPres", addPresByPatient);
patientRouter.post("/getpres",getPresByPatient);

patientRouter.post("/addEprescription",addEPresByPatient);
patientRouter.post("/geteprescription",getEPresByPatient);

patientRouter.post("/search",getDoctor)


module.exports = patientRouter;

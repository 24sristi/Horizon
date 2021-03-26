const express = require("express");
const doctorRouter = express.Router();
const multer = require("multer");
const { doctorSignup, doctorLogin, updateDoctorProfilePhoto, updateDetails, doctorisLoggedIn } = require("../Controller/doctorController");
const { addEPresByDoc, getEPresByDoc } = require("../Controller/EprescriptionController");
const { getfollowing, sendRequest, cancelRequest } = require("../Controller/followerController");
const { getPatient } = require("../Controller/patientController");
const { addPresByDoc, getPresByDoc } = require("../Controller/prescriptionController");
const { addReportByDoc, getReportByDoc } = require("../Controller/reportController");
const { logout, protectRoute } = require("../Controller/userController");


doctorRouter.post("/signup", doctorSignup);
doctorRouter.post("/login", doctorLogin);

doctorRouter.use(protectRoute);
doctorRouter.post("/logout", logout)
doctorRouter.patch("/updateprofilephoto",updateDoctorProfilePhoto);
doctorRouter.patch("/updateDetails",updateDetails);
doctorRouter.post("/getFollowing",getfollowing);
doctorRouter.post("/sendRequest/:pid",sendRequest);
doctorRouter.post("/cancel",cancelRequest);

doctorRouter.use(doctorisLoggedIn);
doctorRouter.post("/addPres",addPresByDoc);
doctorRouter.post("/getPres",getPresByDoc);
doctorRouter.post("/addLb",addReportByDoc);
doctorRouter.post("/getLb",getReportByDoc);
doctorRouter.post("/addEpres",addEPresByDoc);
doctorRouter.post("/getEpres",getEPresByDoc);
doctorRouter.post("/search",getPatient);



module.exports = doctorRouter;

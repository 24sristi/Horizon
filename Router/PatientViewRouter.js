const express = require("express");
const { PatientisLoggedIn } = require("../Controller/patientController");
const { logout } = require("../Controller/userController");
const { getPatientLogin, getPatientSignup, getConact, getEmergency, getHorizon, getThank, getPatientProfile, getDoctorProfileFromPatientView, getPatientLabReports, getPatientPrescriptions, getPatientEPrescriptions, getPendingRequestInPatientView, getDoctorListInPatientView } = require("../Controller/ViewController");
const patientViewRouter = express.Router();

patientViewRouter.route("").get(getHorizon);
patientViewRouter.route("/logout").get(logout)
patientViewRouter.use(PatientisLoggedIn);
patientViewRouter.route("/profile").get(getPatientProfile)
patientViewRouter.route("/labReports").get(getPatientLabReports);
patientViewRouter.route("/prescription").get(getPatientPrescriptions);
patientViewRouter.route("/Eprescription").get(getPatientEPrescriptions);
patientViewRouter.route("/pendingRequest").get(getPendingRequestInPatientView);
patientViewRouter.route("/doctorList").get(getDoctorListInPatientView);
patientViewRouter.route("/login").get(getPatientLogin);
patientViewRouter.route("/signup").get(getPatientSignup);
patientViewRouter.route("/contact").get(getConact);
patientViewRouter.route("/emergency").get(getEmergency);
patientViewRouter.route("/thank").get(getThank);
patientViewRouter.route("/doc/:dId").get(getDoctorProfileFromPatientView)


module.exports = patientViewRouter;

const express = require("express");
const { doctorisLoggedIn } = require("../Controller/doctorController");
const { sendRequest, unfollow, cancelRequest, unfollowByDoc, cancelRequestByDoc } = require("../Controller/followerController");
const { logout } = require("../Controller/userController");
const { getDocLogin, getDocSignup, getConact, getEmergency, getHorizon, getThank, getDocProfile, getPatientProfileByDoctor, getPatientProfileEpresByDoctor, getPatientProfileLbByDoctor, getPatientProfilePresByDoctor } = require("../Controller/ViewController");
const DocViewRouter = express.Router();

DocViewRouter.route("").get(getHorizon);
DocViewRouter.route("/logout").get(logout)
DocViewRouter.use(doctorisLoggedIn);
DocViewRouter.route("/profile").get(getDocProfile)
DocViewRouter.route("/login").get(getDocLogin);
DocViewRouter.route("/signup").get(getDocSignup);
DocViewRouter.route("/contact").get(getConact);
DocViewRouter.route("/emergency").get(getEmergency);
DocViewRouter.route("/thank").get(getThank);
DocViewRouter.route("/patient/:pid").get(getPatientProfileByDoctor);
DocViewRouter.route("/patient/p/:pid").get(getPatientProfilePresByDoctor);
DocViewRouter.route("/patient/ep/:pid").get(getPatientProfileEpresByDoctor);
DocViewRouter.route("/patient/lb/:pid").get(getPatientProfileLbByDoctor);
DocViewRouter.route("/patient/send/:pid").post(sendRequest)
DocViewRouter.route("/patient/unfollow/:pid").post(unfollowByDoc)
DocViewRouter.route("/patient/cancel/:pid").post(cancelRequestByDoc)

module.exports = DocViewRouter;
    
const { doctorModel } = require("../Model/doctorModel");
const followerModel = require("../Model/followingModel");
const { patientModel } = require("../Model/patientModel");

function getDocLogin(req,res){
    let isLoggedin = req.role?1:0;
    if(req.role=="patient"){
        res.redirect("/p/profile")
    }else if(req.role=="doctor"){
        res.redirect("/d/profile")
    }else{
        res.render("loginAsDoc.ejs", {isLoggedin:isLoggedin, role:req.role})
    }
}

function getPatientLogin(req,res){
    let isLoggedin = req.role?1:0;
    if(req.role=="patient"){
        res.redirect("/p/profile")
    }else if(req.role=="doctor"){
        res.redirect("/d/profile")
    }
    else{
        res.render("loginAsPatient.ejs", {isLoggedin:isLoggedin, role:req.role})
    }
}

function getDocSignup(req,res){
    let isLoggedin = req.role?1:0;
    if(req.role=="patient"){
        res.redirect("/p/profile")
    }else if(req.role=="doctor"){
        res.redirect("/d/profile")
    }else{
        res.render('doctorSignup.ejs', {isLoggedin:isLoggedin, role:req.role});
    }
}

function getPatientSignup(req,res){
    let isLoggedin = req.role?1:0;
    if(req.role=="patient"){
        res.redirect("/p/profile")
    }else if(req.role=="doctor"){
        res.redirect("/d/profile")
    }else{
        res.render('patientSignup.ejs', {isLoggedin:isLoggedin, role:req.role});
    }
}

function getConact(req,res){
    let isLoggedin = req.role?1:0;
    res.render("Contact.ejs", {isLoggedin:isLoggedin, role:req.role});
}

function getEmergency(req,res){
    let isLoggedin = req.role?1:0;
    res.render("Emergency.ejs", {isLoggedin:isLoggedin, role:req.role});
}

function getHorizon(req,res){
    res.render("home.ejs");
}

function getThank(req,res){
    let isLoggedin = req.role?1:0;
    res.render("thankyou.ejs", {isLoggedin:isLoggedin, role:req.role});
}

function getDocProfile(req,res){
    if(req.role=="doctor"){
        res.render("doctorProfile.ejs", {user:req.user});
    }else{
        res.redirect("/d/login")
    }
}
async function getPatientProfileByDoctor(req,res){
    if(req.role=="doctor"){
        let pid = req.params.pid;
        let puser = await patientModel.findById(pid);
        let obj = await followerModel.find({ patientId: pid, doctorId: req.user.id });
        let check;
        if(obj.length==0)check = "not"
        if(obj.length>0 && obj[0].isAccepted)check = "t"
        if(obj.length>0 && !obj[0].isAccepted)check = "f"
        res.render("patientProfileByDoctor.ejs", {user:req.user, puser:puser, status:check});
    }else{
        res.redirect("/d/login")
    }
}
async function getPatientProfilePresByDoctor(req,res){
    if(req.role=="doctor"){
        let pid = req.params.pid;
        let puser = await patientModel.findById(pid);
        let obj = await followerModel.find({ patientId: pid, doctorId: req.user.id });
        let check;
        if(obj.length==0)check = "not"
        if(obj.length>0 && obj[0].isAccepted)check = "t"
        if(obj.length>0 && !obj[0].isAccepted)check = "f"
        res.render("patientProfilePresByDoctor.ejs", {user:req.user, puser:puser, status:check});
    }else{
        res.redirect("/d/login")
    }
}

async function getPatientProfileEpresByDoctor(req,res){
    if(req.role=="doctor"){
        let pid = req.params.pid;
        let puser = await patientModel.findById(pid);
        let obj = await followerModel.find({ patientId: pid, doctorId: req.user.id });
        let check;
        if(obj.length==0)check = "not"
        if(obj.length>0 && obj[0].isAccepted)check = "t"
        if(obj.length>0 && !obj[0].isAccepted)check = "f"
        res.render("patientProfileEpresByDoctor.ejs", {user:req.user, puser:puser, status:check});
    }else{
        res.redirect("/d/login")
    }
}

async function getPatientProfileLbByDoctor(req,res){
    if(req.role=="doctor"){
        let pid = req.params.pid;
        let puser = await patientModel.findById(pid);
        let obj = await followerModel.find({ patientId: pid, doctorId: req.user.id });
        let check;
        if(obj.length==0)check = "not"
        if(obj.length>0 && obj[0].isAccepted)check = "t"
        if(obj.length>0 && !obj[0].isAccepted)check = "f"
        res.render("patientProfileLbByDoctor.ejs", {user:req.user, puser:puser, status:check});
    }else{
        res.redirect("/d/login")
    }
}


function getPatientProfile(req,res){
    if(req.role=="patient"){
        res.render("patientProfile.ejs", {user:req.user});
    }else{
        res.redirect("/p/login", {user:req.user});
    }
} 
function getPatientLabReports(req,res){
    if(req.role=="patient"){
        res.render("PatientLabReports.ejs", {user:req.user});
    }else{
        res.redirect("/p/login", {user:req.user});
    }
} 
function getPatientPrescriptions(req,res){
    if(req.role=="patient"){
        res.render("patientPrescriptions.ejs", {user:req.user});
    }else{
        res.redirect("/p/login", {user:req.user});
    }
} 
function getPatientEPrescriptions(req,res){
    if(req.role=="patient"){
        res.render("patientEPrescriptions.ejs", {user:req.user});
    }else{
        res.redirect("/p/login", {user:req.user});
    }
} 
function getPendingRequestInPatientView(req,res){
    if(req.role=="patient"){
        res.render("pendingRequestInPatientView.ejs", {user:req.user});
    }else{
        res.redirect("/p/login", {user:req.user});
    }
} 
function getDoctorListInPatientView(req,res){
    if(req.role=="patient"){
        res.render("doctorListInPatientView.ejs", {user:req.user});
    }else{
        res.redirect("/p/login", {user:req.user});
    }
} 

async function getDoctorProfileFromPatientView(req,res){
    let docData = await doctorModel.findById(req.params.dId);
    if(req.role=="patient"){
        res.render("doctorProfileFromPatientView.ejs", {user:docData, puser:req.user});
    }else{
        res.redirect("/p/login", );
    }
}



module.exports.getDocLogin = getDocLogin;
module.exports.getPatientLogin = getPatientLogin;
module.exports.getDocSignup = getDocSignup;
module.exports.getPatientSignup = getPatientSignup;
module.exports.getConact = getConact;
module.exports.getEmergency = getEmergency;
module.exports.getHorizon = getHorizon;
module.exports.getThank = getThank;
module.exports.getDocProfile = getDocProfile;
module.exports.getPatientProfile = getPatientProfile;
module.exports.getPatientLabReports = getPatientLabReports;
module.exports.getPatientPrescriptions = getPatientPrescriptions;
module.exports.getPatientEPrescriptions = getPatientEPrescriptions;
module.exports.getDoctorProfileFromPatientView = getDoctorProfileFromPatientView;
module.exports.getPendingRequestInPatientView = getPendingRequestInPatientView;
module.exports.getDoctorListInPatientView = getDoctorListInPatientView;
module.exports.getPatientProfileByDoctor = getPatientProfileByDoctor;
module.exports.getPatientProfileEpresByDoctor = getPatientProfileEpresByDoctor;
module.exports.getPatientProfileLbByDoctor = getPatientProfileLbByDoctor;
module.exports.getPatientProfilePresByDoctor = getPatientProfilePresByDoctor;
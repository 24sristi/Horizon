const profileBtn = document.querySelector("#option1")
const patientListBtn = document.querySelector("#option2")
const Emergency = document.querySelector("#option3")
const Logout = document.querySelector("#option4")
const Contact = document.querySelector("#option9")
const presBtn = document.querySelector("#pres") 
const epresBtn = document.querySelector("#epres") 
const labReportBtn = document.querySelector("#labReport") 
const patientProfile = document.querySelector("#patientProfile");
let pid = window.location.pathname.split("/");
pid = pid[pid.length-1];
window.addEventListener("load", function () {
    profileBtn.addEventListener("click", function () {
        window.location.href = "/d/profile"
    })
    Logout.addEventListener("click", async function () {
        window.location.href = "/d/logout"

    })
    Emergency.addEventListener("click", function () {
        window.location.href = "/d/emergency"
    })
    Contact.addEventListener("click", async function () {
        window.location.href = "/d/contact"

    })
    
    presBtn.addEventListener("click", function(){
        window.location.href = `/d/patient/p/${pid}`;
    })

    epresBtn.addEventListener("click",function(){
        window.location.href = `/d/patient/ep/${pid}`;
    })

    labReportBtn.addEventListener("click",function(){
        window.location.href = `/d/patient/lb/${pid}`;
    })
    patientProfile.addEventListener("click",function(){
        window.location.href = `/d/patient/${pid}`;
    })

})

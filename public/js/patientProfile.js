const profileBtn = document.querySelector("#option1")
const labReportBtn = document.querySelector("#option2")
const prescriptionBtn = document.querySelector("#option3")
const ePrescriptionBtn = document.querySelector("#option4")
const pendingBtn = document.querySelector("#option5")
const logout = document.querySelector("#option6")
const doctorBtn = document.querySelector("#option7")
const searchBtn = document.querySelector("#searchBtn");

window.addEventListener("load", function () {
    profileBtn.addEventListener("click", function () {
        window.location.href = "/p/profile";
    })

    labReportBtn.addEventListener("click", function () {
        window.location.href = "/p/labReports";
    })

    prescriptionBtn.addEventListener("click", function () {
        window.location.href = "/p/prescription";
    })

    ePrescriptionBtn.addEventListener("click", function () {
        window.location.href = "/p/Eprescription";
    })

    pendingBtn.addEventListener("click", function () {
        window.location.href = "/p/pendingRequest";
    })
    doctorBtn.addEventListener("click", function () {
        window.location.href = "/p/doctorList";
    })

    logout.addEventListener("click", async function () {
        window.location.href = "/p/logout"

    })

   
    
})

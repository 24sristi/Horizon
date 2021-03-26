const showProfile = document.querySelector("#showProfile")
const showLB = document.querySelector("#showLB")
const showPres = document.querySelector("#showPres")
const showEpres = document.querySelector("#showEpres")

window.addEventListener("load", function () {
    showProfile.addEventListener("click", function () {
        window.location.href = "/p/profile";
    })

    showLB.addEventListener("click", function () {
        window.location.href = "/p/labReports";
    })

    showPres.addEventListener("click", function () {
        window.location.href = "/p/prescription";
    })

    showEpres.addEventListener("click", function () {
        window.location.href = "/p/Eprescription";
    })
   
    
})

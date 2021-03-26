const showProfile = document.querySelector("#showProfile");
const showPatientList = document.querySelector("#showPatientList");

showProfile.addEventListener("click",function(){
        
    profilesection.style.display = "block"
    patientList.style.display = "none"
    heading.innerHTML = "Profile"
})
showPatientList.addEventListener("click",function(){
    profilesection.style.display = "none"
    patientList.style.display = "block"
    heading.innerHTML = "Patient's List"
})
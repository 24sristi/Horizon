const loginDoc= document.querySelector(".loginD");
const loginPatient = document.querySelector(".loginP");

loginDoc.addEventListener("click",function(){
    window.location.href = "/d/login"
});
loginPatient.addEventListener("click",function(){
    window.location.href = "/p/login"
});

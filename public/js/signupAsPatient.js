const loginBtn = document.querySelector(".loginbtn")
const registerBtn = document.querySelector(".registerbtn")
const patientName = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const age = document.querySelector("#Age");
const pass = document.querySelector("#pw");
const cpass = document.querySelector("#cpw");
const message = document.querySelector(".message");
const submitbtn = document.querySelector(".submitbtn");
let burgerNavBar = document.querySelector(".burger-nav");
let navBarSlide = document.querySelector(".nav-btn-slide")

window.addEventListener("load", function () {

    loginBtn.addEventListener("click", loginBtnHandler);
    registerBtn.addEventListener("click", registerBtnHandler);
    burgerNavBar.addEventListener("click", burgerNav);
    submitbtn.addEventListener("click", submitbtnHandler);

})

loginBtnHandler = () => {
    window.location.href = "/p/login"
}

registerBtnHandler = () => {
    window.location.href = "/p/signup"
}

submitbtnHandler = async () => {
    try {
        if (patientName.value && email.value && phone.value && address.value && pass.value && cpass.value && age.value) {

            let obj = await axios.post("https://horizoncenter.herokuapp.com/patient/signup", { name: patientName.value, email: email.value, password: pass.value, confirmPassword: cpass.value, phone: phone.value, address: address.value,age:age.value});

            if (obj.data.data) {
                window.location.href = "/p/profile";
            } else {
                message.innerHTML = obj.data.message;
            }

        } else {
            message.innerHTML = "All Fields are Compulsory"
        }
    }catch(err){
        console.log(err);
    }
}

burgerNav = () => {
    if( navBarSlide.classList.contains("activeBar")){
        navBarSlide.classList.remove("activeBar");
    }else{
        navBarSlide.classList.add("activeBar");
    }
    
}
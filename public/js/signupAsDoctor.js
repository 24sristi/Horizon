const loginBtn = document.querySelector(".loginbtn")
const registerBtn = document.querySelector(".registerbtn")
const docname = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const department = document.querySelector("#departmentName");
const time = document.querySelector("#timing");
const address = document.querySelector("#address");
const fees = document.querySelector("#fees");
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
    window.location.href = "/d/login"
}

registerBtnHandler = () => {
    window.location.href = "/d/signup"
}

submitbtnHandler = async () => {
    try {

        if (docname.value && email.value && phone.value && time.value && address.value && fees.value && pass.value && cpass.value) {

            let obj = await axios.post("https://horizoncenter.herokuapp.com/doctor/signup", { name: docname.value, email: email.value, password: pass.value, confirmPassword: cpass.value, phone: phone.value, address: address.value, timing: time.value, department: department.value, fees: fees.value });

            if (obj.data.data) {
                window.location.href = "/d/profile";
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
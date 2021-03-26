let email = document.querySelector("#Email");
let pass = document.querySelector("#Pwd");
let message = document.querySelector("#message");
let submitBtn = document.querySelector(".submit");
let registerBtn = document.querySelector(".register");
let loginBtn = document.querySelector(".login");
let burgerNavBar = document.querySelector(".burger-nav");
let navBarSlide = document.querySelector(".nav-btn-slide")

window.addEventListener("load", function () {
    submitBtn.addEventListener("click", submitBtnHandler);
    registerBtn.addEventListener("click", registerBtnHandler);
    burgerNavBar.addEventListener("click", burgerNav);
    loginBtn.addEventListener("click", loginBtnHandler);
    email.addEventListener("keypress", enterBtnHandler);
    pass.addEventListener("keypress", enterBtnHandler);
})

loginBtnHandler = () => {
    window.location.href = "/p/login"
}

registerBtnHandler = () => {
    window.location.href = "/p/signup"
}

submitBtnHandler = async () => {
    if (email.value && pass.value) {
        let obj = await axios.post("https://horizoncenter.herokuapp.com/patient/login", { email: email.value, password: pass.value });

        if (obj.data.data) {
            window.location.href = "/p/profile";
        } else {
            message.innerHTML = obj.data.message;
        }
    } else {
        message.innerHTML = "Add email and password";
    }
}
enterBtnHandler = async (e) => {
    if (e.key == "Enter") {


        if (email.value && pass.value) {
            let obj = await axios.post("https://horizoncenter.herokuapp.com/patient/login", { email: email.value, password: pass.value });

            if (obj.data.data) {
                window.location.href = "/p/profile";
            } else {
                message.innerHTML = obj.data.message;
            }
        } else {
            message.innerHTML = "Add email and password";
        }
    }
}

burgerNav = () => {
    if (navBarSlide.classList.contains("activeBar")) {
        navBarSlide.classList.remove("activeBar");
    } else {
        navBarSlide.classList.add("activeBar");
    }

}


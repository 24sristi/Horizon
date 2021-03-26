let burgerNavBar = document.querySelector(".burger-nav");
let navBarSlide = document.querySelector(".nav-btn-slide")

window.addEventListener("load", function () {
    burgerNavBar.addEventListener("click", burgerNav);
})
burgerNav = () => {
    if( navBarSlide.classList.contains("activeBar")){
        navBarSlide.classList.remove("activeBar");
    }else{
        navBarSlide.classList.add("activeBar");
    }
    
}
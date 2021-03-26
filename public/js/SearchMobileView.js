const searchMObileBtn = document.querySelector("#searchBtnMobile");
const searchdiv = document.querySelector(".search");
let check = false;
searchMObileBtn.addEventListener("click",function(){
    if(!check){
        searchdiv.style.display = "flex";
        check = true;
    }else{
        searchdiv.style.display = "none";
        check = false;
    }
})
const reqbtn = document.querySelector(".reqBtn")

if (reqbtn.innerHTML == "Unfollow") {
    reqbtn.addEventListener("click", async function () {
        await axios.post(`https://horizoncenter.herokuapp.com/d/patient/unfollow/${pid}`);
        window.location.reload();
    })
} else if (reqbtn.innerHTML == "Send Request") {
    reqbtn.addEventListener("click", async function () {
        await axios.post(`https://horizoncenter.herokuapp.com/d/patient/send/${pid}`);
        window.location.reload();
    })

} else {
    reqbtn.addEventListener("click", async function () {
        await axios.post(`https://horizoncenter.herokuapp.com/d/patient/cancel/${pid}`);
        window.location.reload();
    });

}

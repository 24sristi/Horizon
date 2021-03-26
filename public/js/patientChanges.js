let dpBtn = document.querySelector("#changeProfilePic");
const editBtn = document.querySelector(".editBtn");
const saveBtn = document.querySelector(".saveBtn");
const cancelBtn = document.querySelector(".ProfilecancelBtn");
const changeDPBtn = document.querySelector("#changeDPBtn");
const pname = document.querySelector("#pEmail")
const pphone = document.querySelector("#pPhone")
const page = document.querySelector("#pAge")
const paddress = document.querySelector("#pAddress")


dpBtn.addEventListener("change",async function (e) {
    const task = await storage.ref(`images/patient/${e.target.files[0].name}`).put(e.target.files[0]);
    let link = await storage.ref("images/patient").child(e.target.files[0].name).getDownloadURL()
    await axios.patch("https://horizoncenter.herokuapp.com/patient/updateprofilephoto",{imagePath:link});
    window.alert("Profile Pic Updated");
    window.location.reload();
})

editBtn.addEventListener("click", function () {
        pphone.readOnly = false;
        paddress.readOnly = false;
        page.readOnly = false;
        saveBtn.style.display = "flex"
        editBtn.style.display = "none";
        cancelBtn.style.display = "flex";
        changeDPBtn.style.display = "flex";
    })
    cancelBtn.addEventListener("click", function () {

        saveBtn.style.display = "none";
        editBtn.style.display = "flex";
        cancelBtn.style.display = "none"
        window.location.reload();
    })

    saveBtn.addEventListener("click", async function () {
        let obj = {}
        if (pname.value) {
            obj.email = pname.value;
        }
        if (pphone.value) {
            obj.phone = pphone.value
        }
        if (paddress.value) {
            obj.address = paddress.value;
        }
        if (page.value) {
            obj.age = page.value;
        }

        let newDetails = await axios.patch("https://horizoncenter.herokuapp.com/patient/updateDetails", obj);

        saveBtn.style.display = "none";
        editBtn.style.display = "flex";
        cancelBtn.style.display = "none"
        changeDPBtn.style.display = "none"
    })

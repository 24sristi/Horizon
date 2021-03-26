let dpBtn = document.querySelector("#changeProfilePic");
dpBtn.addEventListener("change",async function (e) {
    const task = await storage.ref(`images/doctor/${e.target.files[0].name}`).put(e.target.files[0]);
    let link = await storage.ref("images/doctor").child(e.target.files[0].name).getDownloadURL()
    await axios.patch("https://horizoncenter.herokuapp.com/doctor/updateprofilephoto",{imagePath:link});
    window.alert("Profile Pic Updated");
    window.location.reload();
})
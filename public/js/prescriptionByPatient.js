const presDocName = document.querySelector("#addpresDocName");
const presDepartment = document.querySelector("#addpresDepartment");
const presDate = document.querySelector("#addpresDate");
const addprescriptionPic = document.querySelector("#addpresPic");
const addPrescriptionBtn = document.querySelector("#addPres");
const prescriptionDiv = document.querySelector(".prescription")
const prescriptionMessage = document.querySelector("#addPrescriptionMess")
const Prespercent = document.querySelector("#Prescriptionpercentage")
const addPrescriptionDialog = document.querySelector("#addPrescription");
const closeAddPresDialog = document.querySelector("#closePresDialodBtn");

const openAddPresDialog = document.querySelector(".openAddPrescriptionDialog");

window.addEventListener("load", async function () {

    openAddPresDialog.addEventListener("click",function(){
        addPrescriptionDialog.style.display = "flex";
    })
    closeAddPresDialog.addEventListener("click",function(){
        addPrescriptionDialog.style.display = "none";
    })

    addPrescriptionBtn.addEventListener("click", async function () {
        if (presDocName.value && presDepartment.value && presDate.value && addprescriptionPic.files[0]) {
            let obj = {};
            let link;
            let t = Date.now();
            const task = storage.ref(`images/prescription/${t}${addprescriptionPic.files[0].name}`).put(addprescriptionPic.files[0]);
            task.on('state_changed', function (snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                Prespercent.innerHTML = `${progress}%`
            },
                function (err) {
                    window.alert("Error in saving image");
                },
                function () {
                    storage.ref("images/prescription").child(`${t}${addprescriptionPic.files[0].name}`).getDownloadURL().then(async function (url) {
                        link = url;
                        obj.prescriptionPath = link;
                        obj.doctorName = presDocName.value;
                        obj.time = presDate.value;
                        obj.department = presDepartment.value;
                        await axios.post("https://horizoncenter.herokuapp.com/patient/addPres",obj);
                        window.alert("Added Prescription");
                        window.location.reload();
                    })
                });


        } else {
            prescriptionMessage.innerHTML = "All Fields Are Compulsory";
        }
    })

})


async function getPres() {
    let data = await axios.post("https://horizoncenter.herokuapp.com/patient/getpres");
    const Prescriptions = data.data.data;
    let ul = document.createElement("ul");
    ul.classList.add("Prescriptions");

    for (let i = 0; i < Prescriptions.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("find",Prescriptions[i].department);
        let item = document.createElement("div");
        item.classList.add("item");

        let sno = document.createElement("div");
        sno.classList.add("sno");
        sno.innerHTML = i + 1;

        let DoctorName = document.createElement("div");
        DoctorName.classList.add("DoctorName");
        DoctorName.innerHTML = Prescriptions[i].doctorName;

        let department = document.createElement("div");
        department.classList.add("department");
        department.innerHTML = Prescriptions[i].department;

        let date = document.createElement("div");
        date.classList.add("date");
        date.innerHTML = Prescriptions[i].time;


        let viewbtn = document.createElement("div");
        viewbtn.classList.add("viewBtn");

        let atag = document.createElement("a");
        atag.innerHTML = "View"
        atag.setAttribute("href", Prescriptions[i].prescriptionPath)
        atag.setAttribute("target", "_blank");

        viewbtn.appendChild(atag);
        item.appendChild(sno);
        item.appendChild(DoctorName);
        item.appendChild(department);
        item.appendChild(date);
        item.appendChild(viewbtn)
        li.appendChild(item);
        ul.appendChild(li);

    }

    if (Prescriptions.length == 0) {
        let h1 = document.createElement("h1");
        h1.innerHTML = "No Prescription found!!";
        h1.style.paddingLeft = "50px"
        ul.appendChild(h1)
    }

    prescriptionDiv.appendChild(ul);

}

getPres();


const EpresDate = document.querySelector("#addEPrescriptionDate");
const addEprescription = document.querySelector("#addEprescription");
const EpresProb = document.querySelector("#addEPrescriptionProblemName");
const addEPrescriptionBtn = document.querySelector("#addEPrescription");
const EprescriptionDiv = document.querySelector(".eprescription")
const EprescriptionMessage = document.querySelector("#addEPrescriptionMess")
const openAddDialog = document.querySelector(".openAddEPrescriptionDialog");
const AddPresDialog = document.querySelector("#addEPrescrtion");
const closeBtn = document.querySelector(".closeBtn");

const viewDialog = document.querySelector(".viewEPrescrtion")
const viewCloseBtn = document.querySelector(".epclosebtn");
const viewDocName = document.querySelector(".epDocName")
const viewDepartment = document.querySelector(".epDepartment")
const viewDate = document.querySelector(".epDate")
const viewProblemName = document.querySelector(".epProblemName")
const viewPrescription = document.querySelector(".epPrescrtion")

window.addEventListener("load", async function () {

    addEPrescriptionBtn.addEventListener("click", async function () {
        if (EpresProb.value && EpresDate.value && addEprescription.value) {
            let data = await axios.post("https://horizoncenter.herokuapp.com/doctor/addEpres", {time: EpresDate.value, prescription: addEprescription.value, prob:EpresProb.value, pid:pid });
            window.alert = "Prescription Added successfully!!";
            window.location.reload();
        } else {
            EprescriptionMessage.innerHTML = "All Fields Are Compulsory";
        }
    })

    openAddDialog.addEventListener("click", function () {
        AddPresDialog.style.display = "block"
    })
    closeBtn.addEventListener("click", function () {
        AddPresDialog.style.display = "none"

    })
    viewCloseBtn.addEventListener("click", function(){
        viewDocName.innerHTML = "";
        viewDepartment.innerHTML = "";
        viewDate.innerHTML = "";
        viewProblemName.innerHTML = "";
        viewPrescription.innerHTML = "";
        viewDialog.style.display = "none"
    })

})


async function getEPrescriptions() {
    let data = await axios.post("https://horizoncenter.herokuapp.com/doctor/getEpres",{pid:pid});
    const Eprescriptions = data.data.data;
    let ul = document.createElement("ul");
    ul.classList.add("EPrescriptions");
    for (let i = 0; i < Eprescriptions.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("find",Eprescriptions[i].department);
        let item = document.createElement("div");
        item.classList.add("item");

        let sno = document.createElement("div");
        sno.classList.add("sno");
        sno.innerHTML = i + 1;

        let docName = document.createElement("div");
        docName.classList.add("docName");
        docName.innerHTML = Eprescriptions[i].doctorName;

        let department = document.createElement("div");
        department.classList.add("department");
        department.innerHTML = Eprescriptions[i].department;

        let date = document.createElement("div");
        date.classList.add("date");
        date.innerHTML = Eprescriptions[i].time;

        let EprescriptionByDoc = document.createElement("div");
        EprescriptionByDoc.classList.add("format");
        EprescriptionByDoc.innerHTML = Eprescriptions[i].problemName;

        let viewbtn = document.createElement("div");
        viewbtn.innerHTML = "View"
        viewbtn.classList.add("viewBtn");
        viewbtn.addEventListener("click",function(){
            viewDocName.innerHTML = Eprescriptions[i].doctorName;
            viewDepartment.innerHTML = Eprescriptions[i].department;
            viewDate.innerHTML = Eprescriptions[i].time;
            viewProblemName.innerHTML = Eprescriptions[i].problemName;
            viewPrescription.innerHTML = Eprescriptions[i].prescription;
            viewDialog.style.display = "flex";
        })

        item.appendChild(sno);
        item.appendChild(docName);
        item.appendChild(department);
        item.appendChild(date);
        item.appendChild(EprescriptionByDoc);
        item.appendChild(viewbtn)
        li.appendChild(item);
        ul.appendChild(li);

    }

    if (Eprescriptions.length == 0) {
        let h1 = document.createElement("h1");
        h1.innerHTML = "No Prescription found!!";
        h1.style.paddingLeft = "50px"
        ul.appendChild(h1)
    }

    EprescriptionDiv.appendChild(ul);

}

getEPrescriptions();


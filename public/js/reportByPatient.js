const reportName = document.querySelector("#addReportName");
const reportDepartment = document.querySelector("#addReportDepartment");
const reportDate = document.querySelector("#addReportDate");
const reportPic = document.querySelector("#addReportPic");
const addBtn = document.querySelector("#addReport");
const reportMess = document.querySelector("#addReportMess");
const reportDiv = document.querySelector(".reportsWrapper")
const percent = document.querySelector("#percentage");
const dialogBox = document.querySelector("#LBDialogBox");
const openDialogBtn = document.querySelector(".openAddLBDialog");
const closeDialogBtn = document.querySelector("#closeReportDialog")

window.addEventListener("load", async function () {

    openDialogBtn.addEventListener("click", function(){
        dialogBox.style.display = "flex";
    })
    closeDialogBtn.addEventListener("click", function(){
        dialogBox.style.display = "none";
    })
    addBtn.addEventListener("click", async function () {
        if (reportName.value && reportDepartment.value && reportDate.value && reportPic.files[0]) {
            let obj = {};
            let link;
            let t = Date.now()
            const task = storage.ref(`images/report/${t}${reportPic.files[0].name}`).put(reportPic.files[0]);
            task.on('state_changed', function (snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                percent.innerHTML = `${progress}%`
            },
                function (err) {
                    window.alert("Error in saving image");
                },
                function () {
                    storage.ref("images/report").child(`${t}${reportPic.files[0].name}`).getDownloadURL().then(async function (url) {
                        link = url;
                        obj.reportPath = link;
                        obj.testName = reportName.value;
                        obj.time = reportDate.value;
                        obj.department = reportDepartment.value;
                        await axios.post("https://horizoncenter.herokuapp.com/patient/addReport",obj);
                        window.alert("Added Report Updated");
                        window.location.reload();
                    })
                });


        } else {
            reportMess.innerHTML = "All Fields Are Compulsory";
        }
    })

})


async function getReport() {
    let data = await axios.post("https://horizoncenter.herokuapp.com/patient/getReport");
    const reports = data.data.data;
    let ul = document.createElement("ul");
    ul.classList.add("Reports");

    for (let i = 0; i < reports.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("find",reports[i].department);
        let item = document.createElement("div");
        item.classList.add("item");

        let sno = document.createElement("div");
        sno.classList.add("sno");
        sno.innerHTML = i + 1;

        let ReportName = document.createElement("div");
        ReportName.classList.add("ReportName");
        ReportName.innerHTML = reports[i].testName;

        let department = document.createElement("div");
        department.classList.add("department");
        department.innerHTML = reports[i].department;

        let date = document.createElement("div");
        date.classList.add("date");
        date.innerHTML = reports[i].time;

        let viewbtn = document.createElement("div");
        viewbtn.classList.add("viewBtn");

        let atag = document.createElement("a");
        atag.innerHTML = "View"
        atag.setAttribute("href", reports[i].reportPath)
        atag.setAttribute("target", "_blank");

        viewbtn.appendChild(atag);
        item.appendChild(sno);
        item.appendChild(ReportName);
        item.appendChild(department);
        item.appendChild(date);
        item.appendChild(viewbtn)
        li.appendChild(item);
        ul.appendChild(li);

    }

    if (reports.length == 0) {
        let h1 = document.createElement("h1");
        h1.innerHTML = "No Reports found!!";
        h1.style.paddingLeft = "50px"
        ul.appendChild(h1)
    }
    reportDiv.appendChild(ul);

}

getReport();


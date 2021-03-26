const profileBtn = document.querySelector("#option1")
const patientListBtn = document.querySelector("#option2")
const Emergency = document.querySelector("#option3")
const Logout = document.querySelector("#option4")
const heading = document.querySelector(".heading");
const profile = document.querySelector(".wrap");
const patientList = document.querySelector(".patientList");
const options = document.querySelectorAll(".options a")
const profilesection = document.querySelector(".wrap");
const editBtn = document.querySelector(".editBtn");
const dname = document.querySelector("#dEmail")
const dphone = document.querySelector("#dPhone")
const dtime = document.querySelector("#dtime")
const ddepartment = document.querySelector("#dDepartment")
const dfees = document.querySelector("#dFees")
const daddress = document.querySelector("#dAddress")
const saveBtn = document.querySelector(".saveBtn");
const Contact = document.querySelector("#option9")
const cancelBtn = document.querySelector(".cancelBtn");

async function fetchData(){
    let ul = document.createElement("ul");
    ul.classList.add("Reports");
    let patientListObj = await axios.post("https://horizoncenter.herokuapp.com/doctor/getFollowing");
    const obj = patientListObj.data.data;
    for(let i=0;i<obj.length;i++){
        let li = document.createElement("li");
        let item = document.createElement("div");
        item.classList.add("item");
        let sno = document.createElement("div");
        sno.classList.add("sno")
        sno.innerHTML = i+1;
        let PName = document.createElement("div");
        PName.classList.add("PName")
        PName.innerHTML = obj[i].name;
        let address = document.createElement("div");
        address.classList.add("address")
        address.innerHTML = obj[i].address;
        let phone = document.createElement("div");
        phone.classList.add("phone")
        phone.innerHTML = obj[i].phone;
        let viewBtn = document.createElement("div");
        viewBtn.classList.add("viewBtn");
        viewBtn.innerHTML = "View"
        viewBtn.addEventListener("click", function(){
            window.location.href = `/d/patient/${obj[0]._id}`
        })
        item.appendChild(sno)
        item.appendChild(PName)
        item.appendChild(address)
        item.appendChild(phone)
        item.appendChild(viewBtn)
        li.appendChild(item);
        ul.appendChild(li);
        
    }

    if(obj.length==0){
        let h1 = document.createElement("h1");
        h1.innerHTML = "No Patient found!!";
        h1.style.paddingLeft = "50px"
        ul.appendChild(h1)
    }

    patientList.appendChild(ul);
    
}

fetchData();

window.addEventListener("load",function(){
    profileBtn.addEventListener("click",function(){
        
        profilesection.style.display = "flex"
        patientList.style.display = "none"
        heading.innerHTML = "Profile"
    })
    patientListBtn.addEventListener("click",function(){
        profilesection.style.display = "none"
        patientList.style.display = "block"
        heading.innerHTML = "Patient's List"
    })
    Logout.addEventListener("click",async function(){
        window.location.href = "/d/logout"
        
    })
    Emergency.addEventListener("click",function(){
        window.location.href = "/d/emergency"
    })
    Contact.addEventListener("click", async function () {
        window.location.href = "/d/contact"

    })
    
     editBtn.addEventListener("click",function(){
        dphone.readOnly = false;
        daddress.readOnly = false;
        dtime.readOnly = false;
        ddepartment.readOnly = false;
        dfees.readOnly = false;
        saveBtn.style.display = "flex"
        cancelBtn.style.display = "flex";
        editBtn.style.display = "none";
     })

     saveBtn.addEventListener("click",async function(){
         let obj = {}
         if(dname.value){
             obj.email = dname.value;
         }
         if(dphone.value){
             obj.phone = dphone.value
         }
         if(daddress.value){
             obj.address = daddress.value;
         }
         if(ddepartment.value){
             obj.department = ddepartment.value
         }
         if(dfees.value){
             obj.fees = dfees.value;
         } if(dtime.value){
             obj.timing = dtime.value;
         }

          let newDetails = await axios.patch("https://horizoncenter.herokuapp.com/doctor/updateDetails",obj);

         saveBtn.style.display = "none";
         editBtn.style.display = "flex";
         cancelBtn.style.display = "none";
     })

     cancelBtn.addEventListener("click",function(){
         window.location.reload();
     })
})

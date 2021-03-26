const reqDiv = document.querySelector(".seePendingReq");

async function addRequests(){
    let data = await axios.post("https://horizoncenter.herokuapp.com/patient/getPendingReq");
    const obj = data.data.data;
    let ul = document.createElement("ul");
    ul.classList.add("pendingReq");
    if(obj.length==0){
        let h1 = document.createElement("h1");
        h1.innerHTML = "No Pending Request!!";
        h1.style.paddingLeft = "50px"
        ul.appendChild(h1)
    }

    for(let i=0;i<obj.length;i++){
        let li = document.createElement("li");

        let item = document.createElement("div");
        item.classList.add("item");

        let sno = document.createElement("sno");
        sno.classList.add("sno");
        sno.innerHTML = i+1;

        let name = document.createElement("div");
        name.classList.add("DoctorName");
        name.classList.add("doctorViewName")
        name.innerHTML = obj[i].name;
        name.addEventListener("click",function(){
            window.location.href = `/p/doc/${obj[i]._id}`;
        })

        let department = document.createElement("div");
        department.classList.add("department");
        department.innerHTML = obj[0].department;

        let acceptbtn = document.createElement("div");
        acceptbtn.classList.add("acceptBtn");
        acceptbtn.innerHTML = "Accept";
        acceptbtn.addEventListener("click",async function(){
            try{
                await axios.post("https://horizoncenter.herokuapp.com/patient/comfirmReq",{doctorId:obj[i]._id});
                window.alert = "Request Accepted!!";
                li.style.display = "none"
            }catch(err){
                console.log(err);
            }
        })
        
        let cancelbtn = document.createElement("div");
        cancelbtn.classList.add("cancelBtn");
        cancelbtn.innerHTML = "Cancel";
        cancelbtn.addEventListener("click",async function(){
            try{
                await axios.post("https://horizoncenter.herokuapp.com/patient/cancel",{doctorId:obj[i]._id});
                window.alert = "Request canceled!!";
                li.style.display = "none";
            }catch(err){
                console.log(err);
            }
        })

        item.appendChild(sno);
        item.appendChild(name);
        item.appendChild(department);
        item.appendChild(acceptbtn);
        item.appendChild(cancelbtn)
        li.appendChild(item);
        ul.appendChild(li);

    }

    reqDiv.appendChild(ul);


}
addRequests();
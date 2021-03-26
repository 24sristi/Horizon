const DoctorsList = document.querySelector(".DoctorsList");

async function DocList(){
    let data = await axios.post("https://horizoncenter.herokuapp.com/patient/getFollowers");
    const obj = data.data.data;
    let ul = document.createElement("ul");
    ul.classList.add("docList");
    if(obj.length==0){
        let h1 = document.createElement("h1");
        h1.innerHTML = "Empty List!!";
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
        name.classList.add("doctorViewName");
        name.innerHTML = obj[i].name;
        name.addEventListener("click",function(){
            window.location.href = `/p/doc/${obj[i]._id}`;
        })

        let department = document.createElement("div");
        department.classList.add("department");
        department.innerHTML = obj[0].department;

        let phone = document.createElement("div");
        phone.classList.add("phone");
        phone.innerHTML = obj[0].department;

        let cancelbtn = document.createElement("div");
        cancelbtn.classList.add("removeBtn");
        cancelbtn.innerHTML = "Remove";
        cancelbtn.addEventListener("click",async function(){
            try{
                await axios.post("https://horizoncenter.herokuapp.com/patient/unfollow",{doctorId:obj[i]._id});
                window.alert = "Request canceled!!";
                li.style.display = "none";
            }catch(err){
                console.log(err);
            }
        })

        item.appendChild(sno);
        item.appendChild(name);
        item.appendChild(department);
        item.appendChild(phone)
        item.appendChild(cancelbtn)
        li.appendChild(item);
        ul.appendChild(li);

    }

    DoctorsList .appendChild(ul);


}
DocList();
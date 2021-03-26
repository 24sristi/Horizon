let search = document.querySelector("#SearchInput");

window.addEventListener("load",function(){

    searchBtn.addEventListener("click",async function(){
        const email = search.value;
        let data = await axios.post("https://horizoncenter.herokuapp.com/doctor/search", {email:email});
        let obj  = data.data.data;
        if(obj.length==0){
            
        }else{
            window.location.href = `/d/patient/${obj[0]._id}`;
        }
        
    });
    search.addEventListener("keypress", async function(e){
        if (e.key == "Enter"){
            const email = search.value;
            let data = await axios.post("https://horizoncenter.herokuapp.com/doctor/search", {email:email});
            let obj  = data.data.data;
            if(obj.length==0){
                
            }else{
                window.location.href = `/d/patient/${obj[0]._id}`;
            }
        }
    });
})
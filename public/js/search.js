let srchInp = document.querySelector('.search-inp');
let srchBtn = document.querySelector('.search-btn');

let search = ()=>{
    let toSrch = srchInp.value;

    if(toSrch != ""){
        for(let listing of allListings){
            listing.style.display = "flex";   
        }
        for(let listing of allListings){
            if(!listing.children[0].children[1].children[0].innerText.includes(toSrch) && 
               !listing.children[0].children[1].children[2].innerText.includes(toSrch) && 
               !listing.children[0].children[1].children[3].innerText.includes(toSrch)){
                listing.style.display = "none";
            }   
        } 
    }else{
        for(let listing of allListings){
            listing.style.display = "flex";   
        }
    }
}

srchBtn.addEventListener("click",search);

srchInp.addEventListener("keypress",(ev)=>{
    if(ev.keyCode == 13){
        search();
    }   
})

srchInp.addEventListener("blur",()=>{
    srchInp.value = "";
})
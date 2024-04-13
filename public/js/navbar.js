let user = document.querySelector('#user');
let collapse = document.querySelector('#collapse');
let cross = document.querySelector("#cross");

if(user){
    user.addEventListener("click", ()=>{
        collapse.style.right = 0;
    })
}

if(cross){
    cross.addEventListener("click", ()=>{
        collapse.style.right = "-350px";
    })
}

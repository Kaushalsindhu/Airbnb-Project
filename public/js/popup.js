let popup = document.querySelector(".filter-popup");
let bigBox = document.querySelector("#full-body");

function openPopup(){
    popup.classList.add("openPopup");
    bigBox.classList.add("blur");
}

function closePopup(){
    popup.classList.remove("openPopup");
    bigBox.classList.remove("blur");
}
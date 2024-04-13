// TAX LOGIC
let taxSwitch = document .getElementById("flexSwitchCheckDefault");
    taxSwitch.addEventListener("click",()=>{
        let taxes = document.getElementsByClassName("tax");
        let noTaxes = document.getElementsByClassName("no-tax");
        for(tax of taxes){
            if(tax.style.display != "none"){
                tax.style.display = "none";
            }else{
                tax.style.display = "block";  
            } 
        }
        for(noTax of noTaxes){
            if(noTax.style.display != "none"){
                noTax.style.display = "none";
            }else{
                noTax.style.display = "block";  
            } 
        }
    })

//FILTER LOGIC
let btns = document.querySelectorAll(".filter")
    let allListings = document.querySelectorAll("#listing");
    for(let btn of btns){
        btn.addEventListener("click",()=>{
            let show = btn.innerText;
            if(show != "All"){
                for(let listing of allListings){
                    listing.style.display = "flex";   
                }
                for(let listing of allListings){
                    if(listing.children[0].children[1].children[1].innerText != show){
                        listing.style.display = "none";
                    }   
                } 
            }else{
                for(let listing of allListings){
                    listing.style.display = "flex";   
                }
            }
        })
    }

//SCROLL ANIMATION
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
})
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el)=> observer.observe(el));


import { users } from "./users.js";
const loggedUser=localStorage.getItem("loggedUser");
if(loggedUser){
    var userId = JSON.parse(loggedUser).id;

}
const user = users?.find(u => u.id === userId);
const userCartCount=user?.cart?.length;
const allCartIcons= document.querySelectorAll(".cart_count")
export function displayCartCount(){
    allCartIcons.forEach(icon=>{
        icon.textContent=` (${userCartCount?userCartCount: '0'}) `
    })
}

displayCartCount()

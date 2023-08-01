// Top_bar_left
// const user_name = "Michael Jackson";
// const profile_name = document.querySelector(".profile_name");
// const message = document.querySelector(".message");
// profile_name.innerHTML = user_name;
// let time_of_day = "Morning";
// message.innerHTML = `${time_of_day}, ${user_name}`;
//console.log("user_name");

// Sidebar_left_top


let sidebar_left_toggle = document.querySelector("#menu");
const sidebar_left_content = document.querySelector(".sidebar_left_content");
const expand =document.querySelector("#expand");
const collapse =document.querySelector("#collapse");
let siderbar_left_open = false;
const toggle=()=>
{
    sidebar_left_content.classList.toggle('active');    
    if(siderbar_left_open)
    {
        console.log('closing siderbar_left_open');
        siderbar_left_open=false;
        collapse.classList.remove('active');
        expand.classList.remove('active');
    }
    else
    {
        console.log('siderbar_left_open');
        siderbar_left_open=true;
         collapse.classList.add('active');
         expand.classList.add('active');
    }
}
// console.log(sidebar_left_content)
sidebar_left_toggle.addEventListener("click",(e)=>{
     toggle();       
});
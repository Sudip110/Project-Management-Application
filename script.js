//--------------------------------- Global variables--------------------------------------------------------------------- 
let sidebar_left_toggle = document.querySelector("#menu");
let siderbar_left_open = false;

const projectAddForm = document.querySelector(".project_add_form");
const projectAddButton = document.querySelector(".project_add");
const projectProgress=document.querySelector('.project_progress');
const projectOkButton = document.querySelector('.project_ok');
let totalTask=0, totalTaskCompleted=0;
const projectSlider= document.querySelector(".Projects_slider");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const submitTask = document.querySelector(".task_submit");
let projectCards=[], tasksArray =[];;
let prevIndex=0;
let currentIndex = 0;  
let currentProjectName="";

//--------------------------------- Global variables--------------------------------------------------------------------- 

// -----------------------------Expand and collapse functionality in the menu slider------------------------------------
const toggle=()=>
{
    // const searchbar_input = document.querySelector(".search_bar_input");
    const date = document.querySelector(".date");
    const searchBox = document.querySelector(".search_box");
    const sidebar_left_content = document.querySelector(".sidebar_left_content");
    const search_bar = document.querySelector(".search_bar");
    const main_content=document.querySelector(".main_content_carousal");
    const expand =document.querySelector("#expand");
    const collapse =document.querySelector("#collapse");
    sidebar_left_content.style.transition='all 1s';
     search_bar.style.transition='all 0.5s';
     main_content.style.transition='all 1s';
    sidebar_left_content.classList.toggle('active'); 
    main_content.classList.toggle('active'); 
    search_bar.classList.toggle('active');
    searchBox.classList.toggle('active');
    // searchbar_input.classList.toggle('active');
    date.classList.toggle('active');
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


// ---------------------Fuction to create project card---------------------------------------
const createProjectCard=(name,color)=>
{
    const customElement = document.createElement("div");
    customElement.className = "project_card";
    customElement.innerHTML = `
        <span class="project_name_card">${name}</span>
        <p>Progress</p>
        <span class="project_progress">80</span>
        <div class="progress_bar" style="background-color:aliceblue;">
        <div id="bar" style="height:24px;width:1%;background-color: red;"></div>
        </div>
        <i class='bx bx-plus-circle task_add' id=${name}></i>
        
    `;
    customElement.style.backgroundColor=color;
    return customElement;
}

// to add tasks to projects
    class projectTask 
    {
        constructor(projectName)
        {
            this.projectName=projectName;
            this.tasks=[];
        }

    }


   projectSlider.addEventListener("click",(event)=>{
        if (event.target.classList.contains('task_add') || event.target.classList.contains('project_card')) {
            let projectName;
            if(event.target.classList.contains('task_add'))
             {
                const taskForm = document.querySelector(".task_form");
                currentProjectName=event.target.id;
                projectName=currentProjectName;
                taskForm.style.display="block";

            }
            else
            {
                projectName=event.target.querySelector('.task_add').getAttribute("id");
                console.log(projectName);
                tasksArray.forEach((task)=>{
                    if(task.projectName===projectName)
                    {
                        updateTasks(task);
                    }
                    console.log(tasksArray);
               })
            }
            
        }
  })

//to take inputs from the task panel
submitTask.addEventListener("click",(event)=>
{
    const taskForm = document.querySelector(".task_form");
    taskForm.style.display="none";
    tasksArray.forEach((task)=>{
        if(task.projectName===currentProjectName)
        {
            console.log("updating Array");
            const allTasks = document.querySelectorAll(".task")
            console.log(typeof(allTasks));
            console.log(allTasks);
            allTasks.forEach((task1)=>{
                if(task1.value!=="")
                task.tasks.push(task1.value);
            })
            updateTasks(task);
            console.log(task.tasks);
            // updateTasks(task);
        }
    })
})
// -------------------------------Incrementing progressbar functionality----------------------
// const increment_progress_bar=()=>{
// console.log("clickedMe");
// //  temporary
// totalTaskCompleted=80;
//   let width ;
 
//     if (width >= 100) {
//     //   clearInterval(id);
//     } else {
//       width=totalTaskCompleted;
//       elem.style.transition='all 1s';
//       elem.style.width = width + '%';
//   }
// }
// -------------------------------Incrementing progressbar functionality----------------------


sidebar_left_toggle.addEventListener("click",(e)=>{
     toggle(); 
    
});

projectAddButton.addEventListener('click',(e)=>{
   
    projectAddForm.style.display='block';
    projectAddButton.style.display='none';
})


projectOkButton.addEventListener('click',(e)=>{
    const name = document.querySelector(".project_name").value;
    const ProjectCardColor =["#8F00FF","#4B0082","#13274F","#6F00FF","#FFA500","#353935"];
    if(name.length===0 || !name.replace(/\s/g, '').length)
    {
        alert("Please Enter a Project Name");
    }
    else
    {
        console.log('OK clicked'); 
        let colorIndex = Math.floor(Math.random()*((ProjectCardColor.length-1) + 1) );
        // so that the same color is not repeated twice in a row
        if(prevIndex==colorIndex)
            colorIndex = Math.floor(Math.random()*((ProjectCardColor.length-1) + 1) );
        prevIndex=colorIndex
        const ProjectCardcolor=ProjectCardColor[colorIndex];
        const projectCard = createProjectCard(name,ProjectCardcolor);
        projectCards.push(projectCard);
        projectSlider.appendChild(projectCard);
        // Hide elements except the first three
        updateProjectSlides();    
        projectAddForm.style.display='none';
        projectAddButton.style.display='block';
        const task = new projectTask(name);
        tasksArray.push(task);
        console.log(tasksArray);
        console.log(task.projectName);
    }
    // if(projectCards.length===1)
    // {
    //     projectSlider.style.justifyContent="center";
    // }
    // else{
    //     projectSlider.style.justifyContent="left";
    // }
    
})

const updateProjectSlides=()=>
{
    const noOfCards=projectCards.length;
    console.log(noOfCards);
    if(noOfCards>3)
    {
        projectCards.forEach((card)=>{
            if(projectCards.indexOf(card)==(noOfCards-3)-1)
                card.style.display="none";
            prevButton.style.display="block";
            nextButton.style.display="block";
        })
    }
    else
    {
        projectCards.forEach(card=>card.style.display="block");
        prevButton.style.display="none";
        nextButton.style.display="none";
    }
}

      

// Next button click event
nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= projectCards.length) {
       currentIndex = 0;
    }
  
    // Show the next 3 elements
    projectCards.forEach((card)=>{
        if(projectCards.indexOf(card)<currentIndex+3 && projectCards.indexOf(card)>=currentIndex)
          card.style.display="block";
        else
          card.style.display="none";
          if(currentIndex==projectCards.length-1||currentIndex==projectCards.length-2)
          {
            projectCards[projectCards.length-2].style.display="block";
            projectCards[projectCards.length-3].style.display="block";
          }
    })
    console.log(currentIndex);
  });
  
  // Previous button click event
  prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = projectCards.length - 1;
    }
  //   3--  2  2 1 0 2-- 1 0 -1 
    // Show the previous 3 elements
    projectCards.forEach((card)=>{
       
        if(projectCards.indexOf(card)>currentIndex-3 && projectCards.indexOf(card)<=currentIndex)
          card.style.display="block";
        else
          card.style.display="none";
        // so that there are three elements at any point.
          if(currentIndex==1||currentIndex==0)
          {
            projectCards[2].style.display="block";
            projectCards[1].style.display="block";
          }
             
          console.log(currentIndex)
             
    })
  });

const updateTasks=(projectTask)=>
{
    const allTasks=document.querySelector(".all_tasks");
    allTasks.innerHTML="";
    projectTask.tasks.forEach((task)=>{
        const taskListItem = document.createElement('li')
        taskListItem.classList.add("task_list_element");
        taskListItem.innerHTML=task;
        allTasks.appendChild(taskListItem);
    })
    console.log(`updatetask ${projectTask.tasks}`);
    
}
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
const taskForm = document.querySelector(".task_form");
//const taskContainer=document.querySelector(".all_tasks");
let clickedProjectCard=null;
let projects=[], tasksArray =[];;
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

// to add tasks to projects
    class project
    {
        constructor(projectName,colorCode)
        {
            this.projectName=projectName;
            this.colorCode=colorCode;
            //the following array will contain a list of objects of the class taskElement
            this.tasks=[];
            this.status=false;
            this.projectCard=this.createProject(this.projectName,this.colorCode);
            projectSlider.appendChild(this.projectCard);

            this.projectCard.addEventListener("click",(event)=>{
                clickedProjectCard=this.projectName;
                if(this.tasks.length!==0 && clickedProjectCard!==this.projectName)
                    this.updateTasksContainer();
                if(event.target.classList.contains('task_add'))
                {
                    taskForm.style.display="block";
                }
            })

            submitTask.addEventListener("click",(event)=>
            {
                const taskInputArray = document.querySelectorAll(".task");
                taskForm.style.display="none";
                if(taskInputArray.length!==0)
                {
                    taskInputArray.forEach((taskInput)=>{
                        if(taskInput.value!=="")
                        this.addNewTasksToTasksArray(taskInput.value);
                    })
                }
                this.updateTasksContainer();
            })
        }

        createProject(projectName,colorCode)
        {
            const customElement = document.createElement("div");
            customElement.className = "project_card";
            customElement.innerHTML = `
                <span class="project_name">${projectName}</span>
                <p>Progress</p>
                <span class="project_progress">80</span>
                <div class="progress_bar" style="background-color:aliceblue;">
                <div id="bar" style="height:24px;width:1%;background-color: red;"></div>
                </div>
                <i class='bx bx-plus-circle task_add' id=${projectName}></i>
                
            `;
            customElement.style.backgroundColor=colorCode;
            return customElement;
        }

        updateTasksContainer()
        {
            const taskContainer = document.querySelector(".all_tasks")
            taskContainer.innerHTML="";
            this.tasks.forEach((taskElementObj)=>{
                taskContainer.appendChild(taskElementObj.task);
            })
        }
        
        addNewTasksToTasksArray(taskString)
        {
            const task = new taskElement(taskString);
            this.tasks.push(task);
        }
        

    }

    class taskElement
    {
        constructor(taskName,projectName)
        {
            this.taskName=taskName;
            this.projectName=projectName;
            //creating the task element
            this.task=this.createTask();
            this.status="incomplete";   
        }
        createTask()
        {
            const task = document.createElement("div");
            task.classList.add("task_list_element");
            const taskDescription = document.createElement("p");
            taskDescription.textContent=this.taskName;
            const taskTickIconRegular = document.createElement("i");
            taskTickIconRegular.classList.add('bx','bx-check-circle', 'task_item_check_regular');
            const taskTickIconSolid = document.createElement('i');
            taskTickIconSolid.classList.add('bx','bxs-check-circle', 'task_item_check_solid');
            task.appendChild(taskDescription);
            task.appendChild(taskTickIconRegular);
            task.appendChild(taskTickIconSolid);
            return task;
        }
    }


//    projectSlider.addEventListener("click",(event)=>{
//         if (event.target.classList.contains('task_add') || event.target.classList.contains('project_project')) {
//             let projectName;
//             if(event.target.classList.contains('task_add'))
//              {
//                 const taskForm = document.querySelector(".task_form");
//                 currentProjectName=event.target.id;
//                 projectName=currentProjectName;
//                 taskForm.style.display="block";

//             }
//             else
//             {
//                 projectName=event.target.querySelector('.task_add').getAttribute("id");
//                 console.log(projectName);
//                 tasksArray.forEach((task)=>{
//                     if(task.projectName===projectName)
//                     {
//                        // updateTasks(task);
//                     }
//                     console.log(tasksArray);
//                })
//             }
            
//         }
//   })

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
    const ProjectprojectColor =["#8F00FF","#4B0082","#13274F","#6F00FF","#FFA500","#353935"];
    if(name.length===0 || !name.replace(/\s/g, '').length)
    {
        alert("Please Enter a Project Name");
    }
    else
    {
        console.log('OK clicked'); 
        let colorIndex = Math.floor(Math.random()*((ProjectprojectColor.length-1) + 1) );
        // so that the same color is not repeated twice in a row
        if(prevIndex==colorIndex)
            colorIndex = Math.floor(Math.random()*((ProjectprojectColor.length-1) + 1) );
        prevIndex=colorIndex
        const projectprojectColor=ProjectprojectColor[colorIndex];
        const projectComp= new project(name,projectprojectColor);
        projects.push(projectComp);
        // Hide elements except the first three   
        projectAddForm.style.display='none';
        projectAddButton.style.display='block';
        updateProjectSlides(); 
    }
})

const updateProjectSlides=()=>
{
    const noOfProjects=projects.length;
    console.log(noOfProjects);
    if(noOfProjects>3)
    {
        projects.forEach((project)=>{
            if(projects.indexOf(project)==(noOfProjects-3)-1)
                project.projectCard.style.display="none";
            prevButton.style.display="block";
            nextButton.style.display="block";
        })
    }
    else
    {
        projects.forEach(project=>project.projectCard.style.display="block");
        prevButton.style.display="none";
        nextButton.style.display="none";
    }
}

      

// Next button click event
nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= projects.length) {
       currentIndex = 0;
    }
  
    // Show the next 3 elements
    projects.forEach((project)=>{
        if(projects.indexOf(project)<currentIndex+3 && projects.indexOf(project)>=currentIndex)
          project.projectCard.style.display="block";
        else
          project.projectCard.style.display="none";
          if(currentIndex==projects.length-1||currentIndex==projects.length-2)
          {
            projects[projects.length-2].style.display="block";
            projects[projects.length-3].style.display="block";
          }
    })
    console.log(currentIndex);
  });
  
  // Previous button click event
  prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = projects.length - 1;
    }
  //   3--  2  2 1 0 2-- 1 0 -1 
    // Show the previous 3 elements
    projects.forEach((project)=>{
       
        if(projects.indexOf(project)>currentIndex-3 && projects.indexOf(project)<=currentIndex)
          project.projectCard.style.display="block";
        else
          project.projectCard.style.display="none";
        // so that there are three elements at any point.
          if(currentIndex==1||currentIndex==0)
          {
            projects[2].style.display="block";
            projects[1].style.display="block";
          }
             
          console.log(currentIndex)
             
    })
  });

// const updateTasks=(projectTask)=>
// {
   
//     allTasks.innerHTML="";
//     projectTask.tasks.forEach((task)=>{
        
//         allTasks.appendChild(task);
//     })
    
    
// }

// TO detect if a task is completed
// allTasks.addEventListener("click",(event)=>
// {
//     if(event.target.classList.contains("task_item_check_regular"))
//     {
//         const taskId=event.querySelector(".task_list_element").id;
//         tasksArray.forEach((task1)=>
//         {
//             if(taskId.includes(task1.projectName))
//             {
//                 task1.tasks.forEach((task)=>
//                 {

//                 })
//             }
//         })
//     }
// })

const projectComp= new project("Duxica","#6F00FF");
        const firststring="some";
        const secondstring ="String";
        const resultstring = firststring+secondstring;
        console.log(resultstring.includes(firststring));
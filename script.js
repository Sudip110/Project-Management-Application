
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
const taskContainer=document.querySelector(".all_tasks");
let clickedProjectCard=null;
let projects=[], tasksArray =[];;
let prevIndex=0;
let currentIndex = 0;  
let currentProjectName="";

//--------------------------------- Global variables--------------------------------------------------------------------- 

document.addEventListener('DOMContentLoaded', function () {
    // Find the taskContainer element and initialize Simplebar
    console.log("initializing simplebar");
    const taskContainer = document.querySelector('.all_tasks');
    new SimpleBar(taskContainer);
  });
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
            this.errorMessage= document.createElement('p');
            //the following array will contain a list of objects of the class taskElement
            this.tasks=[];
            this.status=false;
            this.projectCard=this.createProject(this.projectName,this.colorCode);
            projectSlider.appendChild(this.projectCard);
            
            this.projectCard.addEventListener("click",(event)=>{
                clickedProjectCard=this.projectName;
                console.log(event.target.classList.contains('task_add'))
                if(event.target.classList.contains('task_add'))
                {
                    taskForm.style.display="block";
                }
                else if(this.tasks.length!==0)
                    this.updateTasksContainer();
                else
                   this.displayNoTasksMessage();
            })

            submitTask.addEventListener("click",(event)=>
            {
                if(clickedProjectCard===this.projectName)
                {
                    const taskInputArray = document.querySelectorAll(".task");
                    console.log(taskInputArray.length)
                          
                        taskContainer.innerHTML="";
                        taskInputArray.forEach((taskInput)=>{
                            if(taskInput.value!=="")
                        {
                            console.log(taskInput.value)
                            this.addNewTasks(taskInput.value);
                        } 
                        })

                        if(this.tasks.length===0)
                        {
                            this.errorMessage.classList.add("error_message");
                            this.errorMessage.innerText=`Please Enter atleast one task!`;
                            this.errorMessage.style.color="red";
                            submitTask.style.border ="2px solid red";
                            taskForm.appendChild(this.errorMessage);
                        }
                        else
                             taskForm.style.display="none";
                    this.updateTasksContainer();  
                    // if(this.tasks.length >10)
                    //     taskContainer.style.overflowY = "scroll";
                    // else
                    // taskContainer.style.overflowY = "none";
                    
                }
                
                
               // this.updateTasksContainer();
            })
        }

        createProject(projectName,colorCode)
        {
            const customElement = document.createElement("div");
            customElement.className = "project_card";
            customElement.innerHTML = `
                <span class="project_Card_name">${projectName}</span>
                <p>Progress</p>
                <span class="project_progress"></span>
                <div class="progress_bar" style="background-color:aliceblue;">
                <div id="bar" style="height:24px;width:0%;"></div>
                </div>
                <i class='bx bx-plus-circle task_add' id=${projectName}></i>
                
            `;
            customElement.style.backgroundColor=colorCode;
            return customElement;
        }

        updateTasksContainer()
        {
            console.log("updatetasks");
           // const taskContainer = document.querySelector(".all_tasks")
            taskContainer.innerHTML="";
            this.tasks.forEach((taskElementObj)=>{
                taskContainer.appendChild(taskElementObj.task);
            })
        }
            
        addNewTasks(taskString)
        {
            if(taskForm.contains(this.errorMessage))
                   {
                        taskForm.removeChild(this.errorMessage);
                        submitTask.style.border = "";
                   }
            
            const task = new taskElement(taskString,this);
            this.tasks.push(task);
            console.log(this.tasks);
        }

        displayNoTasksMessage()
        {
            const noTask = document.createElement("p");
            noTask.classList.add("no_task_message");
            noTask.innerText = "You do not have any tasks for this project yet!"
            taskContainer.innerHTML="";
            taskContainer.appendChild(noTask);
        }
        

    }

    class taskElement
    {
        constructor(taskName,project)
        {
            this.project=project;
            console.log(this.project);
            this.taskName=taskName;
           // this.projectName=projectName;
            //creating the task element
            this.task=this.createTask();
            this.status="incomplete"; 
           // taskContainer.appendChild(this.task);
            //console.log(this.task.querySelectorAll(".task_check"));
            //console.log(this.task);
            this.task.querySelectorAll(".task_check").forEach((icon)=>{
                icon.addEventListener("click",(event)=>{
                   // console.log(this.taskName);
                    const taskCheckReular=this.task.querySelector(".task_item_check_regular");
                    const taskCheckSolid =this.task.querySelector(".task_item_check_solid");
                   // console.log(taskCheckReular.classList);
                    //console.log(taskCheckSolid.classList)
                    if (this.status==="incomplete")
                      {
                         this.status="complete";
                         taskCheckReular.style.display="none";
                         taskCheckSolid.style.display="inline";
                      }
                      else
                      {
                         this.status="incomplete";
                         taskCheckReular.style.display="inline";
                         taskCheckSolid.style.display="none";
                         
                      }
                      this.updateProgressBar()
                })
            })
        }
        createTask()
        {
            const task = document.createElement("div");
            task.classList.add("task_list_element");
            const taskDescription = document.createElement("p");
            taskDescription.textContent=this.taskName;
            const taskTickIconRegular = document.createElement("i");
            taskTickIconRegular.classList.add('bx','bx-check-circle', 'task_check','task_item_check_regular');
            const taskTickIconSolid = document.createElement('i');
            taskTickIconSolid.classList.add('bx','bxs-check-circle', 'task_check', 'task_item_check_solid');
            taskTickIconSolid.style.display="none";
            task.appendChild(taskDescription);
            task.appendChild(taskTickIconRegular);
            task.appendChild(taskTickIconSolid);
            return task;
        }

        updateProgressBar()
        {
            const numberOfTasks = this.project.tasks.length;
            const numberOfTasksCompleted = this.project.tasks.filter((task)=>task.status==="complete").length;
            const completedTaskspercent = Math.floor((numberOfTasksCompleted/numberOfTasks)*100);
            const progressBar = this.project.projectCard.querySelector("#bar");
            this.project.projectCard.querySelector(".project_progress").innerText=`${completedTaskspercent}%`;
            progressBar.style.width=`${completedTaskspercent}%`;
            console.log(completedTaskspercent);
        }

    }


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
   
    document.querySelector(".project_name").style.color="#6c757d";
    projectAddForm.style.display='block';
    projectAddButton.style.display='none';
})


projectOkButton.addEventListener('click',(e)=>{
    const nameInput = document.querySelector(".project_name");
    console.log(nameInput);
    let name=nameInput.value;
    console.log(name)
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
        projectAddForm.style.display='none';
        projectAddButton.style.display='block';
        console.log("updating...");
        updateProjectSlides("Next"); 
    }
})

const updateProjectSlides=(operation)=>
{
    const noOfProjects=projects.length;
    const allProjects = projectSlider.querySelectorAll(".project_card");
    console.log(allProjects)
    //removing all the projectCards
    allProjects.forEach(projectCard=>projectSlider.removeChild(projectCard));
    console.log(noOfProjects);
    
  
    if(noOfProjects>3)
    {
        //TO perform relevant operations based on which button is clicked
        if(operation==="Next")
            currentIndex=(currentIndex+1)%noOfProjects;
        else if(operation=="Prev")
            currentIndex=(currentIndex-1+noOfProjects)%noOfProjects;
        
        for(i = 0;i<3;i++)
            {
                const index = (currentIndex+i)%noOfProjects;
                projectSlider.appendChild(projects[index].projectCard);
            } 
        
        //removing/adding the buttons based on noOfProjects
        console.log("Hereeeee");
        prevButton.style.display="block";
        nextButton.style.display="block";
    }
    else
     {
        console.log("it came here");
        console.log(projectAddButton.style.display);
        prevButton.style.display="none";
        nextButton.style.display="none";
        projects.forEach(project=> projectSlider.appendChild(project.projectCard)); 
     }
}

      

// Next button click event
nextButton.addEventListener("click", () => {
    updateProjectSlides("Next");
  });
  
  // Previous button click event
  prevButton.addEventListener("click", () => {
    updateProjectSlides("Prev");

  });

// updating the date and day

const updateDateAndDay = () =>
{
    const daysOfWeek =["Sunday","Monday","Tuesday","Wednesday","Thursady","Friday","Saturday"];
    const date = document.querySelector(".dateNo");
    const day = document.querySelector(".day");
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    const currentDay = daysOfWeek[dayIndex];
    const displayDate=currentDate.toLocaleDateString();
    day.innerText=currentDay;
    date.innerText=displayDate;
}

updateDateAndDay();
setInterval(()=>updateDateAndDay(),1000);//to update date and day every second 

//   const projectComp= new project("Pj1","#13274F");
//   projects.push(projectComp);
//   const projectComp1= new project("Pj2","#13274F");
//   projects.push(projectComp1);
//   const projectComp2= new project("Pj3","#13274F");
//   projects.push(projectComp2);
// const task1 = new taskElement("Create WireFrame")
// const task2 = new taskElement("Create 2nd WireFrame")
// const task3 = new taskElement("Create 3rd WireFrame")
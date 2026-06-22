const greetingText = document.getElementById("greeting-text");
const studentName = document.getElementById("student-name");
const saveButton = document.getElementById("save-btn");

let habits =[];

saveButton.addEventListener("click", function(){
    const name = studentName.value;

    greetingText.textContent = `Greetings ${name} 👋`;
    localStorage.setItem("studentName", name);
    studentName.value = "";
});

const habitNameInput = document.getElementById("habit-name");
const targetDaysinput = document.getElementById("target-days");
const habitCategory= document.getElementById("habit-category");
const addHabitButton = document.getElementById("add-habit-btn");
const habitList = document.getElementById("habit-list");
const totalHabits = document.getElementById("total-habits");
const doneHabits = document.getElementById("done-habits");
const completionRate = document.getElementById("completion-rate");
const errorMessage = document.getElementById("error-message");

function updateSummary(){

    const allHabits = document.querySelectorAll(".Habit-card");
    //completed habits
    const completedHabits = document.querySelectorAll(".completed");

    const total = allHabits.length;
    const completed = completedHabits.length;

    let percentage = 0;
    if(total > 0){
        percentage = Math.round((completed / total)*100);
    }

    totalHabits.textContent = total;
    doneHabits.textContent = completed;
    completionRate.textContent = `${percentage}%`;

}
 function saveHabits(){
        localStorage.setItem("habits", JSON.stringify(habits));
    }
addHabitButton.addEventListener("click", function(){

    //get values
    const habitName = habitNameInput.value;
    const targetDays = Number(targetDaysinput.value);
    const category = habitCategory.value;
    if(habitName.trim() === ""){
        errorMessage.textContent ="Please enter a habit name.";

        return;
    }

    if(targetDays < 1 || targetDays > 7){
        errorMessage.textContent = "Target must be between 1 and 7."
        return;
    }

    if(category === "Select Category"){
        errorMessage.textContent = "Please select a category.";
        return;
    }

    // clear error
    errorMessage.textContent = "";

    const habit ={
        name: habitName,
        days: targetDays,
        category: category,
        completed: false
    };

    // add to array
    habits.push(habit);
    //save
    saveHabits();

    const habitCard = document.createElement("div");
    habitCard.classList.add("Habit-card");

    habitCard.innerHTML = `<div class = "Habit-info"> 
                                <h3>${habitName}</h3>
                                <p>${category}</p>
                                
                            </div>
                            
                            <div class="Habit-Status">
                            <p> 🎯${targetDays} Days Target </p>
                            <button class ="done-btn">Done Today</button>
                            <button class ="delete-btn"> Delete</button>
                            </div>
                        

                            
                            
                            
                            `;

    habitList.appendChild(habitCard);

    updateSummary();
   
    //Select done button
    const doneButton =habitCard.querySelector(".done-btn");
    const deleteButton =habitCard.querySelector(".delete-btn");
    doneButton.addEventListener("click", function(){
        //toogle complete button
        doneButton.classList.toggle("completed");

        if(doneButton.classList.contains("completed")){
            doneButton.textContent = "Completed ✅";
        } else {
            doneButton.textContent = "Done Today";
        }

         updateSummary();
         saveHabits();

       });
      

    deleteButton.addEventListener("click", function(){
        habitCard.remove();
        
        
        habits = habits.filter(function(item){
            return item.name !==habitName;
        });
        updateSummary();
        saveHabits();

    });

    habitNameInput.value = "";
    targetDaysinput.value = "";
    habitCategory.value = "Select Category";



});

const savedName = localStorage.getItem("studentName");
if(savedName) {
    greetingText.textContent = `Greetings ${savedName} 👋`;

}
updateSummary();
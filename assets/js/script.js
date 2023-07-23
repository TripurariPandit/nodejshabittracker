let weeklyContainer = document.querySelectorAll('.weekly-container');

// This willl show the Daily view of the habit.
function showDailyData(){
    for(let singleClass of weeklyContainer){
        singleClass.style.display = "none";
    }
}

// This will show the Weekly view of habit
function showWeeklyData(){
    for(let singleClass of weeklyContainer){
        singleClass.style.display = "flex";
    }
}
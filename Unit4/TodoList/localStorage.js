const todoForm = document.getElementById("container");
const todoList = document.getElementById("toDoContainer");


// retrieve from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTask = document.createElement("li");
  newTask.innerText = savedTodos[i].task;
  newTask.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newTask.isCompleted) {
    newTask.style.textDecoration = "line-through";
  }
  todoList.appendChild(newTask);
}

todoForm.addEventListener("addToDo", function(event) {
    event.preventDefault();
    let  newTask = document.createElement("li");
    let taskValue = document.getElementById("input").value;
    newTask.innerText = taskValue;
    newTask.isCompleted = false;
    todoForm.reset();
    todoList.appendChild(newTask);

    // save to localStorage
  savedTodos.push({ task: newTask.innerText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});
  
todoList.addEventListener("click", function(event) {
    let completedItem = event.target;
  
    if (! completedItem.isCompleted) {
        completedItem.style.textDecoration = "line-through";
        completedItem.isCompleted = true;
    } else {
        completedItem.style.textDecoration = "none";
        completedItem.isCompleted = false;
    }
  
    // breaks for duplicates - another option is to have dynamic IDs
    for (let i = 0; i < savedTodos.length; i++) {
      if (savedTodos[i].task ===  completedItem.innerText) {
        savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
        localStorage.setItem("todos", JSON.stringify(savedTodos));
      }
    }
  });
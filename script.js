const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const btn = document.getElementById('submit');

let ediTod = null;
const addTask = (e)=>{
    e.preventDefault();
    const inputValue = todoInput.value.trim();
    if(inputValue.length === 0){
        alert('add something in your field')
        return;
    }
    if(btn.textContent === "Save"){
        const oldTodo = ediTod.target.parentElement.firstChild.nodeValue.trim();
       ediTod.target.parentElement.firstChild.nodeValue  = todoInput.value
       editTodoLs(oldTodo,todoInput.value);
        btn.textContent = "Submit";
        todoInput.value = "";
      }else{
    const li = document.createElement('li');
    li.textContent = inputValue;
     const editBtn = document.createElement('button');
    editBtn.textContent  = "Edit";
    editBtn.classList.add("btn", "editBtn");

    const deletBtn = document.createElement('button');
    deletBtn.textContent = "Remove";
    deletBtn.classList.add("btn","deletBtn")
    todoList.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(deletBtn);
    todoInput.value = ''; 
    saveLocalStora(inputValue)  
    }
   
}
    const updaTodo = (e)=>{
       if(e.target.innerText === "Remove"){
        console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement)
        deleteLS(e.target.parentElement);
        console.log("Working smoothly");
       }
      if(e.target.textContent === "Edit"){
        todoInput.value = e.target.parentElement.firstChild.nodeValue.trim();
        todoInput.focus();
        btn.textContent = "Save";
        ediTod = e;
      }
    }
    const saveLocalStora = (todo)=>{
        let todos = JSON.parse(localStorage.getItem("todos"))||[];
        todos.push(todo);
        localStorage.setItem("todos",JSON.stringify(todos))

    }
    const getTodoLs = ()=>{
        let todos = JSON.parse(localStorage.getItem("todos"))||[];
        todos.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            const editBtn = document.createElement('button');
            editBtn.textContent  = "Edit";
            editBtn.classList.add("btn", "editBtn");

            const deletBtn = document.createElement('button');
            deletBtn.textContent = "Remove";
            deletBtn.classList.add("btn","deletBtn")
            todoList.appendChild(li);
            li.appendChild(editBtn);
            li.appendChild(deletBtn);
            
            
        });
    }
    const deleteLS = (todo)=>{
        let todos = JSON.parse(localStorage.getItem("todos"))||[];
        let todoText = todo.firstChild.textContent;
        let indexTodo = todos.indexOf(todoText)
       todos.splice(indexTodo, 1)
       localStorage.setItem("todos",JSON.stringify(todos))
     }
     const editTodoLs = (oldTodo, newTodo)=>{
        let todos = JSON.parse(localStorage.getItem("todos"));

        let todoIndx = todos.indexOf(oldTodo);
        if(todoIndx!==-1){
        todos[todoIndx] = newTodo;  
        
        
        localStorage.setItem("todos",JSON.stringify(todos));
        console.log("todos update in local todos"+todos);
        
        }else{
            console.log("Todo not found in localStorage");
            
        }

     }
    window.onload = ()=>{
        getTodoLs();
    }
btn.addEventListener('click',addTask)
todoList.addEventListener('click',updaTodo)
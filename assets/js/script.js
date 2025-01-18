const todos = [];

// function createDropdown() {
//     const statusDropdown = document.createElement('div');
//     statusDropdown.setAttribute("class", "dropdown");
//     statusDropdown.innerHTML = 
//     `
//         <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Status 
//         </button>
//         <ul class="dropdown-menu">
//           <li id="not-started-btn"><a class="dropdown-item" href="#">Not Started</a></li>
//           <li id="in-progress-btn"><a class="dropdown-item" href="#">In Progress</a></li>
//           <li id="completed-btn"><a class="dropdown-item" href="#">Completed</a></li>
//         </ul>
//     `;
// }

// form submission
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // get user input
    let userInput = document.getElementById("inputField").value;

    const todoId = todos.length + 1;
    todos.push({ id: todoId, text: userInput, status: 'not-started' });

    // create new list item
    const divTodo = document.createElement("div");
    divTodo.textContent = userInput;
    divTodo.setAttribute("id", `todo-item-${todoId}`)
    divTodo.classList.add("todo-item");
    const statusDropdown = document.createElement("div");
    statusDropdown.setAttribute("class", "dropdown");
    statusDropdown.innerHTML = 
    `
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Status 
        </button>
    `;
    divTodo.appendChild(statusDropdown);

    const ulDropdownMenu = document.createElement("ul");
    ulDropdownMenu.setAttribute("class", "dropdown-menu");

    // creates Not Started Btn
    const liNotStartedBtn = document.createElement("li");
    liNotStartedBtn.setAttribute("id", "not-started-btn");
    const aNotStartedBtn = document.createElement("a");
    aNotStartedBtn.setAttribute("id", todoId);
    aNotStartedBtn.setAttribute("class", "dropdown-item");
    aNotStartedBtn.setAttribute("href", "#");
    aNotStartedBtn.textContent = "Not Started";
    liNotStartedBtn.appendChild(aNotStartedBtn);
    ulDropdownMenu.appendChild(liNotStartedBtn);

    // creates In Progress Btn
    const liInProgressBtn = document.createElement("li");
    liInProgressBtn.setAttribute("id", "in-progress-btn");
    const aInProgressBtn = document.createElement("a");
    aInProgressBtn.setAttribute("id", todoId);
    aInProgressBtn.setAttribute("class", "dropdown-item");
    aInProgressBtn.setAttribute("href", "#");
    aInProgressBtn.textContent = "In Progress";
    liInProgressBtn.appendChild(aInProgressBtn);
    ulDropdownMenu.appendChild(liInProgressBtn);

    // creates Completed Btn
    const liCompletedBtn = document.createElement("li");
    liCompletedBtn.setAttribute("id", "completed-btn");
    const aCompletedBtn = document.createElement("a");
    aCompletedBtn.setAttribute("id", todoId);
    aCompletedBtn.setAttribute("class", "dropdown-item");
    aCompletedBtn.setAttribute("href", "#");
    aCompletedBtn.textContent = "Completed";
    liCompletedBtn.appendChild(aCompletedBtn);
    ulDropdownMenu.appendChild(liCompletedBtn);

    statusDropdown.append(ulDropdownMenu);

    // attach event listeners to Not Started, In Progress and Completed Buttons
    liNotStartedBtn.addEventListener('click', function(event) {
        console.log('trying to add evntLst not-started', event.target.id);
        const todo = todos.find((el) => el.id === +event.target.id);
        if (todo.status !== 'not-started') {
            todo.status = 'not-started';
            const todoHTML = document.getElementById(`todo-item-${event.target.id}`);
            document.getElementById("not-started-column").appendChild(todoHTML);
        }
    });
    liInProgressBtn.addEventListener('click', function(event) {
        console.log('trying to add evntLst in-progress', event.target.id);
        const todo = todos.find((el) => el.id === +event.target.id);
        if (todo.status !== 'in-progress') {
            todo.status = 'in-progress';
            const todoHTML = document.getElementById(`todo-item-${event.target.id}`);
            document.getElementById("in-progress-column").appendChild(todoHTML);
        }
    });
    liCompletedBtn.addEventListener('click', function(event) {
        console.log('trying to add evntLst in-progress', event.target.id);
        const todo = todos.find((el) => el.id === +event.target.id);
        if (todo.status !== 'completed') {
            todo.status = 'completed';
            const todoHTML = document.getElementById(`todo-item-${event.target.id}`);
            document.getElementById("completed-column").appendChild(todoHTML);
        }
    });

    // Append the new list item to the existing list
    document.getElementById("not-started-column").appendChild(divTodo);

    // clear input field after submit
    document.getElementById("inputField").value = "";

    //Store information in local storage?
});

// delete button
// localStorage
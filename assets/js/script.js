const todos = [];

const statusDropdown = document.createElement('div');
statusDropdown.setAttribute("class", "dropdown");
statusDropdown.innerHTML = 
`
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Status 
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Not Started</a></li>
      <li><a class="dropdown-item" href="#">In Progress</a></li>
      <li><a class="dropdown-item" href="#">Completed</a></li>
    </ul>
`;    

// form submission
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // get user input
    let userInput = document.getElementById("inputField").value;
    console.log('userInput', userInput);

    todos.push({ index: todos.length + 1, text: userInput, status: 'not-yet'});
    // create new list item
    const divTodo = document.createElement("div");
    divTodo.textContent = userInput;
    divTodo.classList.add('todo-item');
    divTodo.appendChild(statusDropdown.cloneNode(true));
    
    // Append the new list item to the existing list
    document.getElementById("myList").appendChild(divTodo);

    // clear input field after submit
    document.getElementById("inputField").value = "";
    
    // log for debugging
    console.log("User input:", userInput, todos);

    //Store information in local storage?
});


// dropdown
// delete button
// localStorage
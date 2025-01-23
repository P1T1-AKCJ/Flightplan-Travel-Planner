let todos = [];
let todoId = 0;

renderDataFromLocalStorage();

// form submission
document
  .getElementById("addTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // get user input
    let userInput = document.getElementById("inputField").value;
    let userInputObj;
    const todoId = +localStorage.getItem('todoId');

    // validate user input: do nothing if empty
    if (userInput === "") {
      return;
    } else {
      userInputObj = { 
        id: todoId + 1, 
        text: userInput, 
        status: "not-started" 
      };
      todos.push(userInputObj);
    }
    initTodoItem(userInput, userInputObj.status, todoId);
    storeUserInput(userInputObj);
    storeToDoCount();
  });

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("inputField");
  const clearButton = document.getElementById("clearButton");

  // show/hide the clear button based on input
  inputField.addEventListener("input", function () {
    if (inputField.value.trim() !== "") {
      clearButton.style.display = "flex"; // show the clear button
    } else {
      clearButton.style.display = "none"; // hide the clear button
    }
  });

  // clear the input field and hide the button when clicked
  clearButton.addEventListener("click", function () {
    inputField.value = "";
    clearButton.style.display = "none";
    inputField.focus(); // keep the focus on the input
  });
});

function updateCounts() {
  // get the count of tasks in each column
  const notStartedCount = document.querySelectorAll(
    "#not-started-column .todo-item"
  ).length;
  const inProgressCount = document.querySelectorAll(
    "#in-progress-column .todo-item"
  ).length;
  const onHoldCount = document.querySelectorAll(
    "#on-hold-column .todo-item"
  ).length;
  const completedCount = document.querySelectorAll(
    "#completed-column .todo-item"
  ).length;

  // update the text content of the span elements with the class "column-count"
  document.querySelector(".not-started .column-count").textContent =
    notStartedCount;
  document.querySelector(".working-on-it .column-count").textContent =
    inProgressCount;
  document.querySelector(".on-hold .column-count").textContent = onHoldCount;
  document.querySelector(".done .column-count").textContent = completedCount;
}

function showDeleteTodoModal(todoId, userInput) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = userInput;
  const deleteTodoBtn = document.getElementById("delete-todo-btn");
  deleteTodoBtn.addEventListener('click', function () {
    deleteTodo(todoId);
  });
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  const todoToDelete = document.getElementById(`todo-item-${todoId}`);
  todoToDelete?.remove();
  dismissModal();
  updateCounts();
  deleteToDoFromLocalStorage(todoId);
}

function dismissModal() {
  const dismissModalBtn = document.querySelector(".dismiss-modal");
  dismissModalBtn.click();
}

function storeUserInput(userInputObj) {
  const userInputList = JSON.parse(localStorage.getItem('userInputList'));
  if (userInputList) {
    const storedData = JSON.parse(localStorage.getItem('userInputList'));
    storedData.push(userInputObj);
    localStorage.setItem('userInputList', JSON.stringify(storedData));
  } else {
    localStorage.setItem('userInputList', JSON.stringify([userInputObj]));
  }
}

function renderDataFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem('userInputList'));
  if (storedData) {
    todos = storedData;
    storedData.forEach((userInputObj) => {
      initTodoItem(userInputObj.text, userInputObj.status, userInputObj.id);
    });
  }
}

function initTodoItem(userInputText, status, todoId) {
    const divTodo = document.createElement("li");
    const inputText = document.createElement("div");
    
    inputText.setAttribute("class", "todo-text");
    inputText.textContent = userInputText;
    divTodo.setAttribute("id", `todo-item-${todoId}`);
    divTodo.appendChild(inputText);
    divTodo.classList.add("todo-item");
    const statusDropdown = document.createElement("div");
    statusDropdown.setAttribute("class", "dropdown");
    statusDropdown.innerHTML = `
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
    aInProgressBtn.textContent = "Working On It";
    liInProgressBtn.appendChild(aInProgressBtn);
    ulDropdownMenu.appendChild(liInProgressBtn);

    // Add "On Hold" Button
    const liOnHoldBtn = document.createElement("li");
    liOnHoldBtn.setAttribute("id", "on-hold-btn");
    const aOnHoldBtn = document.createElement("a");
    aOnHoldBtn.setAttribute("id", todoId);
    aOnHoldBtn.setAttribute("class", "dropdown-item");
    aOnHoldBtn.setAttribute("href", "#");
    aOnHoldBtn.textContent = "On Hold";
    liOnHoldBtn.appendChild(aOnHoldBtn);
    ulDropdownMenu.appendChild(liOnHoldBtn);

    // creates Completed Btn
    const liCompletedBtn = document.createElement("li");
    liCompletedBtn.setAttribute("id", "completed-btn");
    const aCompletedBtn = document.createElement("a");
    aCompletedBtn.setAttribute("id", todoId);
    aCompletedBtn.setAttribute("class", "dropdown-item");
    aCompletedBtn.setAttribute("href", "#");
    aCompletedBtn.textContent = "Done";
    liCompletedBtn.appendChild(aCompletedBtn);
    ulDropdownMenu.appendChild(liCompletedBtn);

    statusDropdown.append(ulDropdownMenu);

    // attach event listeners to Not Started, In Progress and Completed Buttons
    liNotStartedBtn.addEventListener("click", function (event) {
      const todo = todos.find((el) => el.id === +event.target.id);
      if (todo.status !== "not-started") {
        todo.status = "not-started";
        const todoHTML = document.getElementById(
          `todo-item-${event.target.id}`
        );
        document.getElementById("not-started-column").appendChild(todoHTML);
        updateCounts(); // call updateCounts to refresh the counts
        persistItemStatusInLocalStorage(+event.target.id, "not-started");
      }
    });
    liInProgressBtn.addEventListener("click", function (event) {
      const todo = todos.find((el) => el.id === +event.target.id);
      if (todo.status !== "in-progress") {
        todo.status = "in-progress";
        const todoHTML = document.getElementById(
          `todo-item-${event.target.id}`
        );
        document.getElementById("in-progress-column").appendChild(todoHTML);
        updateCounts(); // call updateCounts to refresh the counts
        persistItemStatusInLocalStorage(+event.target.id, "in-progress");
      }
    });
    liOnHoldBtn.addEventListener("click", function (event) {
      const todo = todos.find((el) => el.id === +event.target.id);
      if (todo.status !== "on-hold") {
        todo.status = "on-hold";
        const todoHTML = document.getElementById(
          `todo-item-${event.target.id}`
        );
        document.getElementById("on-hold-column").appendChild(todoHTML);
      }
      updateCounts(); // Update the counts after moving
      persistItemStatusInLocalStorage(+event.target.id, "on-hold");
    });
    liCompletedBtn.addEventListener("click", function (event) {
      const todo = todos.find((el) => el.id === +event.target.id);
      if (todo.status !== "completed") {
        todo.status = "completed";
        const todoHTML = document.getElementById(
          `todo-item-${event.target.id}`
        );
        document.getElementById("completed-column").appendChild(todoHTML);
        updateCounts(); // call updateCounts to refresh the counts
        persistItemStatusInLocalStorage(+event.target.id, "completed");
      }
    });

    // Append the new list item to the existing list
    // TODO - organize it by status of input item
    if (status) {
      document.getElementById(`${status}-column`).appendChild(divTodo);
    } 

    document.getElementById("inputField").value = "";

    updateCounts(); // Update counts

    // delete button
    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `
      <button type="button" class="btn btn-close" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
      </button>
    `;
    deleteBtn.addEventListener('click', function (event) {
      showDeleteTodoModal(todoId, userInputText);
    }); 
    divTodo.appendChild(deleteBtn);
}

function deleteToDoFromLocalStorage(id) {
  const storedData = JSON.parse(localStorage.getItem('userInputList'));
  const newStoredData = storedData.filter((data) => data.id !== id);
  localStorage.setItem('userInputList', JSON.stringify(newStoredData));
}

function persistItemStatusInLocalStorage (id, newStatus) {
  const storedData = JSON.parse(localStorage.getItem('userInputList'));
  const toDo = storedData.find((data) => data.id === id);
  toDo.status = newStatus;
  localStorage.setItem('userInputList', JSON.stringify(storedData));
}

function storeToDoCount() {
  const currentTodoId = +localStorage.getItem('todoId');
  if (currentTodoId >= 0) {
    localStorage.setItem('todoId', currentTodoId + 1);
  } else {
    localStorage.setItem('todoId', 0);
  }
}

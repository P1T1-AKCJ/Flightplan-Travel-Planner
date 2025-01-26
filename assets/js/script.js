let todos = [];
let todoId = 0;
const mainTableNavMobile = document.querySelector(".main-table-mobile");

// on load webpage event listener
window.addEventListener("load", function (event) {
  if (event.currentTarget.innerWidth <= 768) {
    mainTableNavMobile.classList.remove("hide");
    setCountsAsBadge('not-started');
  } else {
    if (
      event.currentTarget.innerWidth > 768 &&
      !mainTableNavMobile.classList.value.includes("hide")
    ) {
      mainTableNavMobile.classList.add("hide");
    }
  }
});

// screen resize event listener
window.addEventListener("resize", function (event) {
  if (event.currentTarget.innerWidth <= 768) {
    mainTableNavMobile.classList.remove("hide");
  } else {
    if (
      event.currentTarget.innerWidth > 768 &&
      !mainTableNavMobile.classList.value.includes("hide")
    ) {
      mainTableNavMobile.classList.add("hide");
    }
  }
});

renderDataFromLocalStorage();

todos = getDataFromLocalStorage();

localStorage.removeItem("edit-mode");

// form submission
document
  .getElementById("addTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // get user input
    let userInput = document.getElementById("inputField").value;
    let userInputObj;
    const lastTodoId = +localStorage.getItem('todoId');
    const todoId = lastTodoId + 1;

    // validate user input: do nothing if empty
    if (userInput === "") {
      return;
    } else {
      userInputObj = { 
        id: todoId, 
        text: userInput, 
        status: "not-started" 
      };
      todos.push(userInputObj);
    }
    initTodoItem(userInput, userInputObj.status, todoId);
    storeUserInput(userInputObj);
    storeToDoCount();
    setCountsAsBadge('not-started');
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

const notStartedTab = document.getElementById("not-started-tab");
const inProgressTab = document.getElementById("in-progress-tab");
const onHoldTab = document.getElementById("on-hold-tab");
const doneTab = document.getElementById("done-tab");

const notStartedColumn = document.getElementById("not-started-column");
const inProgressColumn = document.getElementById("in-progress-column");
const onHoldColumn = document.getElementById("on-hold-column");
const doneColumn = document.getElementById("done-column");

notStartedTab.addEventListener('click', function (event) {

  notStartedColumn.parentElement.classList.remove("hide");
  inProgressColumn.parentElement.classList.add("hide");
  onHoldColumn.parentElement.classList.add("hide");
  doneColumn.parentElement.classList.add("hide");

  setCountsAsBadge('not-started');
});

inProgressTab.addEventListener('click', function (event) {

  notStartedColumn.parentElement.classList.add("hide");
  inProgressColumn.parentElement.classList.remove("hide");
  onHoldColumn.parentElement.classList.add("hide");
  doneColumn.parentElement.classList.add("hide");

  setCountsAsBadge('in-progress');
});

onHoldTab.addEventListener('click', function (event) {

  notStartedColumn.parentElement.classList.add("hide");
  inProgressColumn.parentElement.classList.add("hide");
  onHoldColumn.parentElement.classList.remove("hide");
  doneColumn.parentElement.classList.add("hide");

  setCountsAsBadge('on-hold');
});

doneTab.addEventListener('click', function (event) {
  event.target.textContent = "✅ Done";
  notStartedTab.textContent = "🕒";
  inProgressTab.textContent = "⚙️";
  onHoldTab.textContent = "🛑";

  notStartedColumn.parentElement.classList.add("hide");
  inProgressColumn.parentElement.classList.add("hide");
  onHoldColumn.parentElement.classList.add("hide");
  doneColumn.parentElement.classList.remove("hide");

  setCountsAsBadge('done');
});

function deleteTodo(todoId) {
  const todoStatus = todos.find((todo) => todo.id === todoId)?.status;
  if (todoStatus) {
    todos = todos.filter((todo) => todo.id !== todoId);
    const todoToDelete = document.getElementById(`todo-item-${todoId}`);
    todoToDelete?.remove();
    dismissModal();
    updateCounts();
    setCountsAsBadge(todoStatus);
    deleteToDoFromLocalStorage(todoId);
  }
}

function initTodoItem(userInputText, status, todoId) {
  const divTodo = document.createElement("li");
  divTodo.setAttribute("id", `todo-item-${todoId}`);
  divTodo.classList.add("todo-item");
  
  const inputText = document.createElement("div");
  inputText.setAttribute("class", "todo-text");
  inputText.textContent = userInputText;
  divTodo.appendChild(inputText);

  const editBtn = document.createElement("div");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `
    <button class="btn btn-edit"
      type="button">
      <svg width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5
        2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5
        1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761
        5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5
        0 0 1-.468-.325"/>
      </svg>
    </button>
  `;
  editBtn.addEventListener('click', function () {
    const storedEditModeAndId = JSON.parse(localStorage.getItem("edit-mode"));
    const todoLi = document.getElementById(`todo-item-${todoId}`);
    if (!storedEditModeAndId) {
      localStorage.setItem("edit-mode", [JSON.stringify({id: todoId, editMode: true})]);
      todoLi.removeChild(todoLi.firstElementChild);
      const editText = document.createElement("div");
      editText.innerHTML = `<div class="input-group flex-nowrap"></div>`;
  
      const editUserInput = document.createElement("input");
      editUserInput.setAttribute("id", "edit-user-input");
      editUserInput.setAttribute("type", "text");
      editUserInput.setAttribute("class", "form-control");
      editUserInput.setAttribute("aria-label", "Username");
      editUserInput.setAttribute("aria-describedby", "addon-wrapping");
      editUserInput.value = userInputText;
  
      editText.append(editUserInput);
      todoLi.insertBefore(editText, todoLi.firstChild);
    } else {
      if (storedEditModeAndId.id === todoId && storedEditModeAndId.editMode === true) {
        localStorage.removeItem("edit-mode");
        const newUserInputValue = document.getElementById("edit-user-input").value;
        todoLi.removeChild(todoLi.firstElementChild);
        const inputText = document.createElement("div");
        inputText.setAttribute("class", "todo-text");
        inputText.textContent = newUserInputValue; // set new user input
        divTodo.insertBefore(inputText, divTodo.firstChild);
        storeUserInput({
          id: todoId, 
          text: newUserInputValue, 
          status: status
        });

      } else if (storedEditModeAndId.id !== todoId && storedEditModeAndId.editMode === true) {
        alert("You are currently editing another field. After you finish your prevous editing you can continue with other fields.")
      }
    }
  });

  divTodo.appendChild(editBtn);
  const statusDropdown = document.createElement("div");
  statusDropdown.setAttribute("class", "dropdown");
  statusDropdown.innerHTML = `
    <button class="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false">
    </button>
  `;
  divTodo.appendChild(statusDropdown);

  const ulDropdownMenu = document.createElement("ul");
  ulDropdownMenu.setAttribute("class", "dropdown-menu");
  createStatusDropdownMenu(ulDropdownMenu, todoId);
  statusDropdown.append(ulDropdownMenu);

  // Append the new list item to the existing list
  // TODO - organize it by status of input item
  if (status) {
    document.getElementById(`${status}-column`).appendChild(divTodo);
  }

  document.getElementById("inputField").value = "";

  updateCounts(); // Update counts

  // delete button
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `
    <button class="btn btn-close"
      type="button" 
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop">
    </button>
  `;
  deleteBtn.addEventListener("click", function (event) {
    showDeleteTodoModal(todoId, userInputText);
  });
  divTodo.appendChild(deleteBtn);
}


function createStatusDropdownMenu(ulDropdownMenu, todoId) {
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

  // creates Done Btn
  const liDoneBtn = document.createElement("li");
  liDoneBtn.setAttribute("id", "done-btn");
  const aDoneBtn = document.createElement("a");
  aDoneBtn.setAttribute("id", todoId);
  aDoneBtn.setAttribute("class", "dropdown-item");
  aDoneBtn.setAttribute("href", "#");
  aDoneBtn.textContent = "Done";
  liDoneBtn.appendChild(aDoneBtn);
  ulDropdownMenu.appendChild(liDoneBtn);

  // attach event listeners to Not Started, In Progress and Done Buttons
  liNotStartedBtn.addEventListener("click", function (event) {
    const todo = todos.find((el) => el.id === +event.target.id);
    const oldStatus = todo.status;
    if (todo.status !== "not-started") {
      todo.status = "not-started";
      const todoHTML = document.getElementById(
        `todo-item-${event.target.id}`
      );
      document.getElementById("not-started-column").appendChild(todoHTML);
      updateCounts(); // call updateCounts to refresh the counts
      setCountsAsBadge(oldStatus);
      persistItemStatusInLocalStorage(+event.target.id, "not-started");
    }
  });
  
  liInProgressBtn.addEventListener("click", function (event) {
    const todo = todos.find((el) => el.id === +event.target.id);
    const oldStatus = todo.status;
    if (todo.status !== "in-progress") {
      todo.status = "in-progress";
      const todoHTML = document.getElementById(
        `todo-item-${event.target.id}`
      );
      document.getElementById("in-progress-column").appendChild(todoHTML);
      updateCounts(); // call updateCounts to refresh the counts
      setCountsAsBadge(oldStatus);
      persistItemStatusInLocalStorage(+event.target.id, "in-progress");
    }
  });
  
  liOnHoldBtn.addEventListener("click", function (event) {
    const todo = todos.find((el) => el.id === +event.target.id);
    const oldStatus = todo.status;
    if (todo.status !== "on-hold") {
      todo.status = "on-hold";
      const todoHTML = document.getElementById(
        `todo-item-${event.target.id}`
      );
      document.getElementById("on-hold-column").appendChild(todoHTML);
    }
    updateCounts(); // Update the counts after moving
    setCountsAsBadge(oldStatus);
    persistItemStatusInLocalStorage(+event.target.id, "on-hold");
  });
  
  liDoneBtn.addEventListener("click", function (event) {
    const todo = todos.find((el) => el.id === +event.target.id);
    const oldStatus = todo.status;
    if (todo.status !== "done") {
      todo.status = "done";
      const todoHTML = document.getElementById(
        `todo-item-${event.target.id}`
      );
      document.getElementById("done-column").appendChild(todoHTML);
      updateCounts(); // call updateCounts to refresh the counts
      setCountsAsBadge(oldStatus);
      persistItemStatusInLocalStorage(+event.target.id, "done");
    }
  });
}

// Progress Bar
function updateProgressBar() {
  const storedData = JSON.parse(localStorage.getItem("userInputList"));

  if (storedData) {
    // get total number of tasks
    const totalTasks = storedData.length;

    const notStartedCount = storedData.filter(
      (todo) => todo.status === "not-started"
    ).length;

    const workingOnItCount = storedData.filter(
      (todo) => todo.status === "in-progress"
    ).length;

    const onHoldCount = storedData.filter(
      (todo) => todo.status === "on-hold"
    ).length;

    const doneCount = storedData.filter(
      (todo) => todo.status === "done"
    ).length;

    document.querySelectorAll("progress-bar");
  }
}

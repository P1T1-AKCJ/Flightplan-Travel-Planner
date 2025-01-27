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
  const doneCount = document.querySelectorAll(
    "#done-column .todo-item"
  ).length;

  // update the text content of the span elements with the class "column-count"
  document.querySelector(".not-started .column-count").textContent =
    notStartedCount;
  document.querySelector(".working-on-it .column-count").textContent =
    inProgressCount;
  document.querySelector(".on-hold .column-count").textContent = onHoldCount;
  document.querySelector(".done .column-count").textContent = doneCount;
}

function setCountsAsBadge(status) {
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
  const doneCount = document.querySelectorAll(
    "#done-column .todo-item"
  ).length;

  let notStartedText = '';
  let inProgressText = '';
  let onHoldText = '';
  let doneText = '';

  if (status === 'not-started') {
    notStartedText = "Not Started";
  } else if (status === 'in-progress') {
    inProgressText = "Working On It";
  } else if (status === 'on-hold') {
    onHoldText = "On Hold";
  } else if (status === 'done') {
    doneText = "Done";
  }

  document.querySelector("#not-started-tab").innerHTML =
    `🕒 ${notStartedText} <span class="badge badge-light">${notStartedCount}</span>`;
  document.querySelector("#in-progress-tab").innerHTML =
    `⚙️ ${inProgressText} <span class="badge badge-light">${inProgressCount}</span>`;
  document.querySelector("#on-hold-tab").innerHTML =
    `🛑 ${onHoldText} <span class="badge badge-light">${onHoldCount}</span>`;
  document.querySelector("#done-tab").innerHTML =
    `✅ ${doneText} <span class="badge badge-light">${doneCount}</span>`;
}

function dismissModal() {
  const dismissModalBtn = document.querySelector(".dismiss-modal");
  dismissModalBtn.click();
}

function showDeleteTodoModal(todoId, userInput) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = userInput;
  const deleteTodoBtn = document.getElementById("delete-todo-btn");
  deleteTodoBtn.addEventListener("click", function () {
    deleteTodo(todoId);
  });
}

function deleteTodo(todoId) {

  // if the user is deleting the todo that was being edited, remove the 'edit-mode' key
  const storedEditModeAndId = JSON.parse(localStorage.getItem("edit-mode"));
  if (storedEditModeAndId) {
    // compare the stored edit item's ID to the item being deleted
    if (storedEditModeAndId.id === todoId && storedEditModeAndId.editMode) {
      localStorage.removeItem("edit-mode");
    }
  }

 const todoStatus = todos.find((todo) => todo.id === todoId)?.status;
 if (todoStatus) {
   todos = todos.filter((todo) => todo.id !== todoId);
   const todoToDelete = document.getElementById(`todo-item-${todoId}`);
   todoToDelete?.remove();
   dismissModal();
   updateCounts();
   setCountsAsBadge(todoStatus);
   deleteToDoFromLocalStorage(todoId);
   updateProgressBar();
 }
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
      updateCounts();// call updateCounts to refresh the counts
      setCountsAsBadge(oldStatus);
      persistItemStatusInLocalStorage(+event.target.id, "not-started");
      updateProgressBar();
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
      updateProgressBar();
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
    updateProgressBar();
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
      updateProgressBar();
    }
  });
}

function setEditMode() {
  body.classList.add("edit-mode");
}

function removeEditMode() {
  body.classList.remove("edit-mode");
}

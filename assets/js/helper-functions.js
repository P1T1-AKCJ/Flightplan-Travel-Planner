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
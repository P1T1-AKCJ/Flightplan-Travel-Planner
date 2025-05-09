let todos = [];
let todoId = 0;
const mainTableNavMobile = document.querySelector(".main-table-mobile");

// on load webpage event listener
window.addEventListener("load", function (event) {
  if (event.currentTarget.innerWidth <= 1071) {
    mainTableNavMobile.classList.remove("hide");
    setCountsAsBadge('not-started');
  } else if (event.currentTarget.innerWidth > 1071 && !mainTableNavMobile.classList.value.includes("hide")) {
    mainTableNavMobile.classList.add("hide");
  }
});

// screen resize event listener
window.addEventListener("resize", function (event) {
  if (event.currentTarget.innerWidth <= 1071) {
    mainTableNavMobile.classList.remove("hide");
  } else if (event.currentTarget.innerWidth > 1071 && !mainTableNavMobile.classList.value.includes("hide")) {
    mainTableNavMobile.classList.add("hide");
  }
});

renderDataFromLocalStorage();

todos = getDataFromLocalStorage();

localStorage.removeItem("edit-mode");

// form submission
document
  .querySelector(".add-todo-form")
  .addEventListener("submit", function(event) {
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
    updateProgressBar();
});

document
  .querySelector(".add-todo-form-mobile")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    // get user input
    let userInput = document.getElementById("inputField-mobile").value;
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
    updateProgressBar();
  }
);

document.addEventListener("DOMContentLoaded", function() {
  const inputField = document.getElementById("inputField");
  const inputFieldMobile = document.getElementById("inputField-mobile");
  const clearButton = document.getElementById("clearButton");
  const clearButtonMobile = document.getElementById("clearButton-mobile");

  // show/hide the clear button based on input
  inputField.addEventListener("input", function () {
    if (inputField.value.trim() !== "") {
      clearButton.style.display = "flex"; // show the clear button
    } else {
      clearButton.style.display = "none"; // hide the clear button
    }
  });

  inputFieldMobile.addEventListener("input", function () {
    if (inputFieldMobile.value.trim() !== "") {
      clearButtonMobile.style.display = "flex"; // show the clear button
    } else {
      clearButtonMobile.style.display = "none"; // hide the clear button
    }
  });

  // clear the input field and hide the button when clicked
  clearButton.addEventListener("click", function () {
    inputField.value = "";
    clearButton.style.display = "none";
    inputField.focus(); // keep the focus on the input
  });

  clearButtonMobile.addEventListener("click", function () {
    inputFieldMobile.value = "";
    clearButtonMobile.style.display = "none";
    inputFieldMobile.focus(); // keep the focus on the input
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

notStartedTab.addEventListener('click', function () {
  notStartedColumn.parentElement.classList.remove("hide");
  inProgressColumn.parentElement.classList.add("hide");
  onHoldColumn.parentElement.classList.add("hide");
  doneColumn.parentElement.classList.add("hide");

  setCountsAsBadge('not-started');
});

inProgressTab.addEventListener('click', function () {
  notStartedColumn.parentElement.classList.add("hide");
  inProgressColumn.parentElement.classList.remove("hide");
  onHoldColumn.parentElement.classList.add("hide");
  doneColumn.parentElement.classList.add("hide");

  setCountsAsBadge('in-progress');
});

onHoldTab.addEventListener('click', function () {
  notStartedColumn.parentElement.classList.add("hide");
  inProgressColumn.parentElement.classList.add("hide");
  onHoldColumn.parentElement.classList.remove("hide");
  doneColumn.parentElement.classList.add("hide");

  setCountsAsBadge('on-hold');
});

doneTab.addEventListener('click', function () {
  notStartedColumn.parentElement.classList.add("hide");
  inProgressColumn.parentElement.classList.add("hide");
  onHoldColumn.parentElement.classList.add("hide");
  doneColumn.parentElement.classList.remove("hide");

  setCountsAsBadge('done');
});

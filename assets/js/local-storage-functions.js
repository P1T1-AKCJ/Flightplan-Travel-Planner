function getDataFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("userInputList"));
  if (storedData) {
      return storedData
  } else {
      return [];
  }
}
function renderDataFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("userInputList"));
  if (storedData) {
    storedData.forEach((data) => {
      initTodoItem(data.text, data.status, data.id);
    });
  }
  updateProgressBar();
}

function persistItemStatusInLocalStorage(id, newStatus) {
  const storedData = JSON.parse(localStorage.getItem("userInputList"));
  const toDo = storedData.find((data) => data.id === id);
  toDo.status = newStatus;
  localStorage.setItem("userInputList", JSON.stringify(storedData));
}

function deleteToDoFromLocalStorage(id) {
  const storedData = JSON.parse(localStorage.getItem("userInputList"));
  const newStoredData = storedData.filter((data) => data.id !== id);
  localStorage.setItem("userInputList", JSON.stringify(newStoredData));
  todos = newStoredData;
}

function storeToDoCount() {
  const currentTodoId = +localStorage.getItem("todoId");
  if (currentTodoId >= 0) {
    localStorage.setItem("todoId", currentTodoId + 1);
  } else {
    localStorage.setItem("todoId", 0);
  }
}

function storeUserInput(userInputObj) {
  const userInputList = JSON.parse(localStorage.getItem("userInputList"));
  if (userInputList) {
    const storedData = JSON.parse(localStorage.getItem("userInputList"));
    const todoItem = storedData.find((data) => data.id === userInputObj.id);
    if (todoItem) {
      todoItem.text = userInputObj.text;
      localStorage.setItem("userInputList", JSON.stringify(storedData));
      todos = storedData;
    } else {
      storedData.push(userInputObj);
      localStorage.setItem("userInputList", JSON.stringify(storedData));
      todos = storedData;
    }
  } else {
    localStorage.setItem("userInputList", JSON.stringify([userInputObj]));
    todos = [userInputObj];
  }
}

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
    editBtn.addEventListener('click', function() {
      const storedEditModeAndId = JSON.parse(localStorage.getItem("edit-mode"));
      const todoLi = document.getElementById(`todo-item-${todoId}`);
      if (!storedEditModeAndId) {
        setEditMode();
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
          removeEditMode();
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
  
const notYetStarted = [{ text: '', status: 'not-yet' }];


// form submission
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // get user input
    let userInput = document.getElementById("inputField").value;
    
    notYetStarted.push({ text: userInput, status: 'not-yet'});

    // create new list item
    const li = document.createElement("li");
    li.textContent = userInput;
    li.classList.add('todo-item');

    // next button idea
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", function() {
        
        
    })

    li.appendChild(nextButton);
    
    // Append the new list item to the existing list
    document.getElementById("myList").appendChild(li);

    // clear input field after submit
    document.getElementById("inputField").value = "";
    
    // log for debugging
    console.log("User input:", userInput, notYetStarted);
});

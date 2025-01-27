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

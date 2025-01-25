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

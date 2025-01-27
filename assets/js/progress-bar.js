// Progress Bar
// Progress Bar
function updateProgressBar() {
  const storedData = JSON.parse(localStorage.getItem("userInputList"));

  // if no tasks exist, reset widths to 0% and labels to (0%)
  if (!storedData || storedData.length === 0) {
    const nsBar = document.querySelector(".bg-not-started");
    nsBar.style.width = "0%";
    nsBar.setAttribute("aria-valuenow", 0);
    nsBar.textContent = "Not Started (0%)";

    const wipBar = document.querySelector(".bg-working-on-it");
    wipBar.style.width = "0%";
    wipBar.setAttribute("aria-valuenow", 0);
    wipBar.textContent = "In Progress (0%)";

    const ohBar = document.querySelector(".bg-on-hold");
    ohBar.style.width = "0%";
    ohBar.setAttribute("aria-valuenow", 0);
    ohBar.textContent = "On Hold (0%)";

    const doneBar = document.querySelector(".bg-done");
    doneBar.style.width = "0%";
    doneBar.setAttribute("aria-valuenow", 0);
    doneBar.textContent = "Done (0%)";

    return;
  }

  const totalTasks = storedData.length;

  // count each status
  const notStartedCount = storedData.filter(
    (todo) => todo.status === "not-started"
  ).length;
  const workingOnItCount = storedData.filter(
    (todo) => todo.status === "in-progress"
  ).length;
  const onHoldCount = storedData.filter((todo) => todo.status === "on-hold").length;
  const doneCount = storedData.filter((todo) => todo.status === "done").length;

  // calculate percentages
  const notStartedPct = (notStartedCount / totalTasks) * 100;
  const workingOnItPct = (workingOnItCount / totalTasks) * 100;
  const onHoldPct = (onHoldCount / totalTasks) * 100;
  const donePct = (doneCount / totalTasks) * 100;

  // round for display
  const notStartedPctRounded = Math.round(notStartedPct);
  const workingOnItPctRounded = Math.round(workingOnItPct);
  const onHoldPctRounded = Math.round(onHoldPct);
  const donePctRounded = Math.round(donePct);

  // G=get the progress bar elements
  const nsBar = document.querySelector(".bg-not-started");
  const wipBar = document.querySelector(".bg-working-on-it");
  const ohBar = document.querySelector(".bg-on-hold");
  const doneBar = document.querySelector(".bg-done");

  // update widths and ARIA values
  nsBar.style.width = notStartedPct + "%";
  nsBar.setAttribute("aria-valuenow", notStartedPctRounded);
  nsBar.textContent = `Not Started (${notStartedPctRounded}%)`;

  wipBar.style.width = workingOnItPct + "%";
  wipBar.setAttribute("aria-valuenow", workingOnItPctRounded);
  wipBar.textContent = `Working On It (${workingOnItPctRounded}%)`;

  ohBar.style.width = onHoldPct + "%";
  ohBar.setAttribute("aria-valuenow", onHoldPctRounded);
  ohBar.textContent = `On Hold (${onHoldPctRounded}%)`;

  doneBar.style.width = donePct + "%";
  doneBar.setAttribute("aria-valuenow", donePctRounded);
  doneBar.textContent = `Done (${donePctRounded}%)`;
}
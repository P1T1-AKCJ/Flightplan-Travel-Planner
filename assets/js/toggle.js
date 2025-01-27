/* LOGIC FOR LIGHT AND DARK  MODE */

const toggle = document.querySelector("#toggle img");
const body = document.body;

function toggleLightDark() {
  body.classList.toggle("dark");
  body.classList.toggle("light");

  const mode = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);

  toggle.src =
    mode === "dark"
      ? "assets/images/mode_light.svg"
      : "assets/images/mode_dark.svg";
}

window.onload = function () {
  const mode = localStorage.getItem("theme");

  if (mode) {
    body.classList.add(mode);

    /*toggle.src = mode === "dark"
    ? "assets/images/mode_dark.svg"
    : "assets/images/mode_light.svg"; */
  } else {
    body.classList.add("light");
    /*  toggle.src = "assets/images/mode_light.svg"; */
  }

  toggle.src = body.classList.contains("dark")
    ? "assets/images/mode_light.svg"
    : "assets/images/mode_dark.svg";



  toggle.addEventListener("click", toggleLightDark);
};
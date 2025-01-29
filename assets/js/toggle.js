/* LOGIC FOR LIGHT AND DARK  MODE */

const body = document.querySelector("#body");
const toggle = document.querySelector(".dark-light-mode-toggle");
const toggleMobile = document.querySelector(".dark-light-mode-toggle-mobile");

function toggleLightDark() {
  body.classList.toggle("dark");
  body.classList.toggle("light");

  const mode = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);

  toggle.src =
    mode === "dark"
      ? "assets/images/mode_light.svg"
      : "assets/images/mode_dark.svg";

  toggleMobile.src =
    mode === "dark"
      ? "assets/images/mode_light.svg"
      : "assets/images/mode_dark.svg";
}

window.onload = function () {
  const mode = localStorage.getItem("theme");

  if (mode) {
    body.classList.add(mode);
  } else {
    body.classList.add("light");
  }

  toggle.src = body.classList.contains("dark")
    ? "assets/images/mode_light.svg"
    : "assets/images/mode_dark.svg";

  toggleMobile.src = body.classList.contains("dark")
    ? "assets/images/mode_light.svg"
    : "assets/images/mode_dark.svg";
};

toggle.addEventListener("click", function() {
  toggleLightDark();
});

toggleMobile.addEventListener("click", function() {
  toggleLightDark();
});

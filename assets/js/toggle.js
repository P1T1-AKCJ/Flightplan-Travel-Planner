/* LOGIC FOR LIGHT AND DARK  MODE */

const toggle = document.getElementById("toggle");
const body = document.body;

function toggleLightDark() {
    body.classList.toggle("dark");
    body.classList.toggle("light");
}
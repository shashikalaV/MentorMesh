const user = JSON.parse(localStorage.getItem("user"));

if (!user) window.location.href = "login.html";

/* NAME */
document.getElementById("welcomeText").innerText = "Welcome, " + user.name;

/* DATA */
const teachSkills = JSON.parse(localStorage.getItem("teachSkills")) || [];
const learnSkills = JSON.parse(localStorage.getItem("learnSkills")) || [];
const requests = JSON.parse(localStorage.getItem("requests")) || [];

/* COUNTS */
document.getElementById("teachCount").innerText = teachSkills.length;
document.getElementById("learnCount").innerText = learnSkills.length;
document.getElementById("requestCount").innerText = requests.length;

/* DISPLAY SKILLS */
const teachDiv = document.getElementById("teachSkills");
teachSkills.forEach(s => {
    teachDiv.innerHTML += `<span>${s}</span>`;
});

const learnDiv = document.getElementById("learnSkills");
learnSkills.forEach(s => {
    learnDiv.innerHTML += `<span>${s}</span>`;
});
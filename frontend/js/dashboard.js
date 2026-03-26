/* =========================
   LOAD USER
========================= */
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

/* =========================
   SHOW USER NAME
========================= */
document.getElementById("welcomeText").innerText = "Welcome, " + user.name;

/* =========================
   LOAD SKILLS FROM STORAGE
========================= */
const teachSkills = JSON.parse(localStorage.getItem("teachSkills")) || [];
const learnSkills = JSON.parse(localStorage.getItem("learnSkills")) || [];

/* =========================
   DISPLAY TEACH SKILLS
========================= */
const teachList = document.getElementById("teachSkills");
teachList.innerHTML = "";

if (teachSkills.length === 0) {
    teachList.innerHTML = "<li>No skills added</li>";
} else {
    teachSkills.forEach(skill => {
        const li = document.createElement("li");
        li.innerText = skill;
        teachList.appendChild(li);
    });
}

/* =========================
   DISPLAY LEARN SKILLS
========================= */
const learnList = document.getElementById("learnSkills");
learnList.innerHTML = "";

if (learnSkills.length === 0) {
    learnList.innerHTML = "<li>No skills added</li>";
} else {
    learnSkills.forEach(skill => {
        const li = document.createElement("li");
        li.innerText = skill;
        learnList.appendChild(li);
    });
}

/* =========================
   LOGOUT
========================= */
function logoutUser() {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    window.location.href = "login.html";
}
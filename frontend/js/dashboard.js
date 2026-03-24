/* =========================
   LOAD USER DATA
========================= */

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

/* =========================
   CHECK LOGIN
========================= */

// If no user → redirect to login
if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

/* =========================
   DISPLAY USER NAME
========================= */

// Show welcome message
document.getElementById("welcomeText").innerText = "Welcome, " + user.name;

/* =========================
   LOAD SKILLS (TEMP DEFAULT)
========================= */

// Default skills (we will update later)
const teachSkills = ["No skills added"];
const learnSkills = ["No skills added"];

// Display teach skills
const teachList = document.getElementById("teachSkills");
teachSkills.forEach(skill => {
    const li = document.createElement("li");
    li.innerText = skill;
    teachList.appendChild(li);
});

// Display learn skills
const learnList = document.getElementById("learnSkills");
learnSkills.forEach(skill => {
    const li = document.createElement("li");
    li.innerText = skill;
    learnList.appendChild(li);
});

/* =========================
   LOGOUT FUNCTION
========================= */
function logoutUser() {

    // Remove user from storage
    localStorage.removeItem("user");

    alert("Logged out successfully");

    // Redirect to login
    window.location.href = "login.html";
}
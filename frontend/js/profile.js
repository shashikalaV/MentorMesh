const user = JSON.parse(localStorage.getItem("user"));

if (!user) window.location.href = "login.html";

/* LOAD DATA */
let teachSkills = JSON.parse(localStorage.getItem("teachSkills")) || [];
let learnSkills = JSON.parse(localStorage.getItem("learnSkills")) || [];
let bio = localStorage.getItem("bio") || "";
let image = localStorage.getItem("profileImage");
let isTeacher = localStorage.getItem("isTeacher");

/* SET PROFILE */
document.getElementById("profileName").innerText = user.name;
document.getElementById("bioText").innerText = bio || "No bio added";

/* IMAGE LOAD */
if (image) {
    document.getElementById("profileImage").src = image;
}

/* CLICK IMAGE TO UPLOAD */
document.getElementById("profileImage").onclick = () => {
    document.getElementById("imageUpload").click();
};

/* HANDLE IMAGE UPLOAD */
document.getElementById("imageUpload").onchange = function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        localStorage.setItem("profileImage", reader.result);
        location.reload();
    };

    reader.readAsDataURL(file);
};

/* BADGE */
if (isTeacher === "true") {
    document.getElementById("badge").classList.remove("hidden");
}

/* DISPLAY SKILLS */
function displaySkills() {
    const teachDiv = document.getElementById("teachList");
    teachDiv.innerHTML = "";
    teachSkills.forEach(s => teachDiv.innerHTML += `<span>${s}</span>`);

    const learnDiv = document.getElementById("learnList");
    learnDiv.innerHTML = "";
    learnSkills.forEach(s => learnDiv.innerHTML += `<span>${s}</span>`);
}

/* EDIT MODE */
function toggleEdit() {
    document.getElementById("editSection").classList.toggle("hidden");
}

/* ADD SKILLS */
function addTeachSkill() {
    let val = document.getElementById("teachInput").value;
    teachSkills.push(val);
    localStorage.setItem("teachSkills", JSON.stringify(teachSkills));
    displaySkills();
}

function addLearnSkill() {
    let val = document.getElementById("learnInput").value;
    learnSkills.push(val);
    localStorage.setItem("learnSkills", JSON.stringify(learnSkills));
    displaySkills();
}

/* SAVE PROFILE */
function saveProfile() {
    localStorage.setItem("bio", document.getElementById("bioInput").value);
    alert("Profile updated");
    location.reload();
}

/* PRIVACY */
function openPrivacy() {
    alert("Privacy settings coming in backend phase");
}

/* LOGOUT */
function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

/* DELETE ACCOUNT */
function deleteAccount() {
    localStorage.clear();
    alert("Account deleted");
    window.location.href = "index.html";
}

displaySkills();
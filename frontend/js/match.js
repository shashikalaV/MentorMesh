/* =========================
   CHECK LOGIN
========================= */
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

/* =========================
   GET USER SKILLS
========================= */
const learnSkills = JSON.parse(localStorage.getItem("learnSkills")) || [];

/* =========================
   DUMMY USERS
========================= */
const users = [
    {
        name: "Anita",
        teaches: ["Python", "Photoshop"],
        learns: ["Guitar"]
    },
    {
        name: "Rahul",
        teaches: ["Guitar", "Excel"],
        learns: ["Python"]
    },
    {
        name: "Sneha",
        teaches: ["Cooking", "Photography"],
        learns: ["Editing"]
    }
];

/* =========================
   MATCH LOGIC
========================= */
const matches = users.filter(userObj => {
    return userObj.teaches.some(skill => learnSkills.includes(skill));
});

/* =========================
   DISPLAY MATCHES
========================= */
const container = document.getElementById("matchContainer");

if (matches.length === 0) {
    container.innerHTML = "<p>No matches found</p>";
} else {

    matches.forEach(match => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${match.name}</h3>
            <p><strong>Teaches:</strong> ${match.teaches.join(", ")}</p>
            <p><strong>Wants:</strong> ${match.learns.join(", ")}</p>
            <button class="match-btn" onclick="sendRequest('${match.name}')">
                Send Request
            </button>
        `;

        container.appendChild(card);
    });
}

/* =========================
   SEND REQUEST FUNCTION
========================= */
function sendRequest(name) {

    // Get existing requests or empty array
    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    // Create request object
    const newRequest = {
        sender: user.name,
        receiver: name,
        status: "pending"
    };

    // Add request
    requests.push(newRequest);

    // Save
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Request sent to " + name);
}

/* =========================
   LOGOUT
========================= */
function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
/* =========================
   CHECK LOGIN
========================= */
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

/* =========================
   LOAD REQUESTS
========================= */
let requests = JSON.parse(localStorage.getItem("requests")) || [];

/* =========================
   DISPLAY REQUESTS
========================= */
const container = document.getElementById("requestContainer");

// Filter requests where current user is receiver
const myRequests = requests.filter(req => req.receiver === user.name);

if (myRequests.length === 0) {
    container.innerHTML = "<p>No requests found</p>";
} else {

    myRequests.forEach((req, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${req.sender}</h3>
            <p>Status: ${req.status}</p>

            ${req.status === "pending" ? `
                <button class="match-btn" onclick="acceptRequest(${index})">Accept</button>
                <button class="match-btn" onclick="rejectRequest(${index})">Reject</button>
            ` : ""}
        `;

        container.appendChild(card);
    });
}

/* =========================
   ACCEPT REQUEST
========================= */
function acceptRequest(index) {

    requests[index].status = "accepted";

    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Request accepted");

    location.reload();
}

/* =========================
   REJECT REQUEST
========================= */
function rejectRequest(index) {

    requests[index].status = "rejected";

    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Request rejected");

    location.reload();
}

/* =========================
   LOGOUT
========================= */
function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
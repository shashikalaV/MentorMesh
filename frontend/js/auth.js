/* =========================
   REGISTER FUNCTION
========================= */
function registerUser() {

    // Get values from input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    /* =========================
       VALIDATION
    ========================= */

    // Check if any field is empty
    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    // Password length validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    /* =========================
       STORE DATA (TEMPORARY)
    ========================= */

    // Create user object
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Store in browser localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    // Redirect to login page
    window.location.href = "login.html";
}


/* =========================
   LOGIN FUNCTION
========================= */
function loginUser() {

    // Get login input values
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Get stored user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    /* =========================
       VALIDATION
    ========================= */

    // Check if user exists
    if (!storedUser) {
        alert("No user found. Please register first.");
        return;
    }

    // Check credentials
    if (email === storedUser.email && password === storedUser.password) {
        alert("Login Successful!");

        // Redirect to dashboard (we will create next)
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password");
    }
}
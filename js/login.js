const error = document.querySelector(".error-field");
const success = document.querySelector(".success-login");

// Toggle between login and signup forms with smooth transition
function toggleForm(form) {
    document.getElementById('signup').classList.remove('active');
    document.getElementById('login').classList.remove('active');

    if (form === 'signup') {
        document.getElementById('signup').classList.add('active');
    } else {
        document.getElementById('login').classList.add('active');
    }
}

// Toggle password visibility
function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

// Signup function
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username === "") {
        error.classList.add('error-msg');
        document.querySelector("#signup-username").classList.add("red-border");
        return;
    }
    else {
        error.classList.remove('error-msg');
        document.querySelector("#signup-username").classList.remove("red-border");
    }
    if (password === "") {
        document.querySelector(".error-password").classList.add("error-msg");
        document.querySelector("#signup-password").classList.add("red-border");
        return;
    }
    else {
        document.querySelector(".error-password").classList.remove("error-msg");
        document.querySelector("#signup-password").classList.remove("red-border");
    }
    if (username === "" && password === "") {
        error.classList.add('error-msg');
        document.querySelector(".error-password").classList.add("error-msg");
        document.querySelector("#signup-username").classList.add("red-border");
        document.querySelector("#signup-password").classList.add("red-border");
        return;
    }
    else {
        error.classList.remove('error-msg');
        document.querySelector(".error-password").classList.remove("error-msg");
        document.querySelector("#signup-username").classList.remove("red-border");
        document.querySelector("#signup-password").classList.remove("red-border");
    }

    // Check if user already exists

    if (localStorage.getItem(username)) {
        alert("User already exists! Please log in.");
    }
    else {
        // Store user credentials in localStorage
        const user = { username, password };
        localStorage.setItem(username, JSON.stringify(user));
        const greenblock = document.querySelector(".signup-success");
        greenblock.classList.add("show");
        function timeout(){
        toggleForm('login');
        }
        setTimeout(timeout, 1000);
    }

}

// Login function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (username === "") {
        document.querySelector(".usr-error").classList.add("error-msg");
        document.querySelector("#login-username").classList.add("red-border");
        return;
    }
    else {
        document.querySelector(".usr-error").classList.remove("error-msg");
        document.querySelector("#login-username").classList.remove("red-border");
    }
    if (password === "") {
        document.querySelector(".pswrd-error").classList.add("error-msg");
        document.querySelector("#login-password").classList.add("red-border");
        return;
    }
    else {
        document.querySelector(".pswrd-error").classList.remove("error-msg");
        document.querySelector("#login-password").classList.remove("red-border");
    }
    if (username === "" || password === "") {
        document.querySelector(".usr-error").classList.add("error-msg");
        document.querySelector(".pswrd-error").classList.add("error-msg");
        document.querySelector("#login-username").classList.add("red-border");
        document.querySelector("#login-password").classList.add("red-border");
        return;
    }
    else {
        document.querySelector(".usr-error").classList.remove("error-msg");
        document.querySelector(".pswrd-error").classList.remove("error-msg");
        document.querySelector("#login-username").classList.remove("red-border");
        document.querySelector("#login-password").classList.remove("red-border");
    }


    // Check if user exists
    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
        success.classList.add("green-line");
        startCountdown();
        // Redirect to a new page or dashboard
    } else {

        document.querySelector(".usr-error").classList.add("error-msg");
        document.querySelector(".pswrd-error").classList.add("error-msg");
        document.querySelector("#login-username").classList.add("red-border");
        document.querySelector("#login-password").classList.add("red-border");
    }
    function startCountdown() {
        const countdownElement = document.getElementById("countdown");
        const counterElement = document.getElementById("counter");
        let countdown = 3;  // 3 seconds countdown

        countdownElement.classList.remove("hidden");  // Show the countdown text

        const interval = setInterval(function () {
            countdown--;  // Decrease the countdown
            counterElement.textContent = countdown;  // Update the countdown display

            if (countdown === 0) {
                clearInterval(interval);
                // Redirect to the admin page
                window.location.href = "./admin_page.html";  // Replace with actual admin page URL
            }
        }, 1000);  // Execute every 1 second
    }
}

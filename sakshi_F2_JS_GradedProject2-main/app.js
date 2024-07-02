function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('isLoggedIn', true);
        window.location = 'resume.html';
    } else {
        document.getElementById('errorMessage').innerText = 'Invalid username/password';
    }
}

window.onload = function () {
    if (localStorage.getItem('isLoggedIn')) {
        window.location = 'resume.html';
    }
}

// Default account
localStorage.setItem('username', 'admin');
localStorage.setItem('password', 'admin123');

// JavaScript qismi
const email = document.getElementById('email');
const password = document.getElementById('password');
const btn = document.getElementById('btn');
const form = document.getElementById('form');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validate() {
    if (!email.value || !validateEmail(email.value)) {
        alert("emailni to'g'ri kiriting");
        email.style.outlineColor = 'red';
        email.value = '';
        email.focus();
        return false;
    }

    if (!password.value) {
        password.style.outlineColor = 'red';
        password.focus();
        return false;
    }

    return true;
}

btn.addEventListener('click', function() {
    if (!validate()) {
        return;
    }

    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    if (data.length) {
        let userFound = false;

        data.forEach(user => {
            if (user.email === email.value && user.password === password.value) {
                userFound = true;
                window.location.href = `http://127.0.0.1:5500/pages/success.html?user=${user.email}`;
                return;
            }
        });

        if (!userFound) {
            alert("Noto'g'ri email yoki parol");
            form.reset();
        }
    } else {
        alert("Iltimos avval ro'yxatdan o'ting");
        window.location.href = "http://127.0.0.1:5500/pages/sign_up.html";
    }
});

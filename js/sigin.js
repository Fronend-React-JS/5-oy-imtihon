const email = document.getElementById('email');
const password = document.getElementById('password');
const btn = document.getElementById('btn');
const form = document.getElementById('form');

// Email tekshirish
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validatsiya
function validate() {
    if (!email.value || !validateEmail(email.value)) {
        alert("Iltimos, emailni to‘g‘ri kiriting!");
        email.style.outlineColor = 'red';
        email.value = '';
        email.focus();
        return false;
    }

    if (!password.value) {
        alert("Iltimos, parolni kiriting!");
        password.style.outlineColor = 'red';
        password.focus();
        return false;
    }

    return true;
}

// Kirish tugmasi
btn.addEventListener('click', function () {
    if (!validate()) return;

    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (!data.length) {
        alert("Iltimos, avval ro‘yxatdan o‘ting!");
        window.location.href = "sign_up.html";
        return;
    }

    const user = data.find(u => u.email === email.value && u.password === password.value);
    if (user) {
        window.location.href = `success.html?user=${user.email}`;
    } else {
        alert("Email yoki parol noto‘g‘ri!");
        form.reset();
    }
});

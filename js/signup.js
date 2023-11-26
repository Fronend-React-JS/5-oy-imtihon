const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("up_btn");
const form = document.getElementById("form");

let alertShown = false;

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validate() {
    if (!name.value) {
        showError(name, "Iltimos, ismingizni kiriting");
        return false;
    }

    if (!surname.value) {
        showError(surname, "Iltimos, familiyangizni kiriting");
        return false;
    }

    if (!validateEmail(email.value)) {
        showError(email, "Iltimos, to'g'ri elektron pochtani kiriting");
        return false;
    }

    if (!password.value) {
        showError(password, "Iltimos, parolingizni kiriting");
        return false;
    }

    return true;
}

function validateNumber() {
    const numberValue = parseInt(number.value, 10);

    if (isNaN(numberValue) || numberValue < 12 || numberValue > 100) {
        showError(number, "Iltimos, to'g'ri yoshni kiriting (12 - 100 oralig'ida)");
        return false;
    }

    return true;
}

function showError(element, message) {
    element.style.outlineColor = "red";
    alert(message);
    element.focus();
}

function createUserObject() {
    const user = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
    };

    const data = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    const userExists = data.some(el => el.email === user.email);

    if (userExists) {
        alert("Bunday foydalanuvchi allaqachon ro'yxatda mavjud");
        return;
    }

    data.push(user);
    localStorage.setItem("users", JSON.stringify(data));
    window.location.href = "http://127.0.0.1:5500/pages/sign_in.html";
}

btn.addEventListener("click", function () {
    if (validate()) {
        createUserObject();
        form.reset();
    }
});

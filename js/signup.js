const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("up_btn");
const form = document.getElementById("form");

// Email tekshirish
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validatsiya
function validate() {
    if (!name.value) { alert("Iltimos, ismingizni kiriting!"); name.focus(); return false; }
    if (!surname.value) { alert("Iltimos, familiyangizni kiriting!"); surname.focus(); return false; }
    if (!validateEmail(email.value)) { alert("Iltimos, emailni to‘g‘ri kiriting!"); email.focus(); return false; }
    if (!password.value) { alert("Iltimos, parolni kiriting!"); password.focus(); return false; }
    return true;
}

// Foydalanuvchi yaratish
function createUserObject() {
    const user = { name: name.value, surname: surname.value, email: email.value, password: password.value };

    let data = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    if (data.some(u => u.email === user.email)) {
        alert("Bunday foydalanuvchi allaqachon mavjud!");
        return;
    }

    data.push(user);
    localStorage.setItem("users", JSON.stringify(data));
    alert("Ro‘yxatdan muvaffaqiyatli o‘tdingiz!");
    window.location.href = "sign_in.html";
}

// Ro‘yxatdan o‘tish tugmasi
btn.addEventListener("click", function () {
    if (validate()) {
        createUserObject();
        form.reset();
    }
});

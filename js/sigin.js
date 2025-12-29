const form = document.getElementById("signinForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        : [];

    if (users.length === 0) {
        errorMsg.innerText = "Foydalanuvchi topilmadi. Avval ro‘yxatdan o‘ting.";
        return;
    }

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        errorMsg.innerText = "Email yoki parol noto‘g‘ri!";
        return;
    }

    // Login muvaffaqiyatli
    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "success.html?user=" + user.email;
});

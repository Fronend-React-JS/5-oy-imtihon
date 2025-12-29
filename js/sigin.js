const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.getElementById("btn");

/* =========================
   EMAIL TEKSHIRUV
========================= */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/* =========================
   XATO KO‘RSATISH
========================= */
function showError(input, message) {
  input.classList.add("error");
  input.placeholder = message;
  input.value = "";
  input.focus();

  // shake animatsiya
  input.classList.add("shake");
  setTimeout(() => input.classList.remove("shake"), 400);
}

/* =========================
   VALIDATSIYA
========================= */
function validateForm() {
  if (!emailInput.value.trim()) {
    showError(emailInput, "Emailni kiriting!");
    return false;
  }

  if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, "Email formati noto‘g‘ri!");
    return false;
  }

  if (!passwordInput.value.trim()) {
    showError(passwordInput, "Parolni kiriting!");
    return false;
  }

  return true;
}

/* =========================
   SIGN IN
========================= */
btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (!users.length) {
    alert("Hech qanday foydalanuvchi topilmadi. Avval ro‘yxatdan o‘ting!");
    window.location.href = "sign_up.html";
    return;
  }

  const user = users.find(
    (u) =>
      u.email === emailInput.value.trim() &&
      u.password === passwordInput.value
  );

  if (user) {
    // muvaffaqiyatli kirish
    btn.innerText = "Kirilmoqda...";
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = `success.html?user=${user.email}`;
    }, 900);
  } else {
    showError(emailInput, "Email yoki parol noto‘g‘ri!");
    passwordInput.value = "";
  }
});

/* =========================
   INPUT TOZALASH
========================= */
[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
  });
});

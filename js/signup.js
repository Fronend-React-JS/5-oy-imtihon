const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !surname || !email || !password) {
    alert("Iltimos, barcha maydonlarni to‘ldiring!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(user => user.email === email);
  if (exists) {
    alert("Bu email bilan foydalanuvchi mavjud!");
    return;
  }

  const newUser = {
    name,
    surname,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Muvaffaqiyatli ro‘yxatdan o‘tdingiz!");

  window.location.href = "./sign_in.html";
});

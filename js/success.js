window.onload = function () {
    // URL dan foydalanuvchi emailini olish
    const currentLocation = window.location.href;
    const userEmail = currentLocation.substring(currentLocation.indexOf('user=') + 5);

    // LocalStorage dan foydalanuvchilar ma’lumotini olish
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    if (data.length) {
        let found = false;
        data.forEach(el => {
            if (el.email == userEmail) {
                document.getElementById('name').innerText = el.name;
                document.getElementById('surname').innerText = el.surname;
                document.getElementById('email').innerText = el.email;
                document.getElementById('password').innerText = el.password;
                found = true;
            }
        });

        if (!found) {
            alert("Foydalanuvchi topilmadi! Iltimos, ro‘yxatdan o‘ting.");
            window.location.href = "../index.html";
        }

    } else {
        alert("Iltimos, avval ro‘yxatdan o‘ting.");
        window.location.href = "../index.html";
    }

    // Saqlangan kinolarni chiqarish
    renderSavedMovies();
};

function renderSavedMovies() {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = '';

    let savedMovies = localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : [];

    if (savedMovies.length === 0) {
        moviesContainer.innerHTML = `<p style="color:#fff; text-align:center;">Sizda hali saqlangan kinolar yo‘q.</p>`;
        return;
    }

    savedMovies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-block');

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}">
            <p>${movie.original_title}</p>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

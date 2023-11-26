window.onload = function () {
    const currentLocation = window.location.href;
    const userEmail = currentLocation.substring(currentLocation.indexOf('user=') + 5);

    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    if (data.length) {
        data.forEach(el => {
            if (el.email == userEmail) {
                document.getElementById('name').innerHTML = el.name;
                document.getElementById('surname').innerHTML = el.surname;
                document.getElementById('email').innerHTML = el.email;
                document.getElementById('password').innerHTML = el.password;
            }
        });
    } else {
        window.location.href = "http://127.0.0.1:5500/";
    }
};

const main = document.querySelector('main');
const fragment = document.createDocumentFragment();
document.addEventListener('DOMContentLoaded', function () {
    let data = JSON.parse(localStorage.getItem('savedMovies'));
    createCards(data);
});

function createCards(data) {
    data.forEach((movie) => {
    });
}

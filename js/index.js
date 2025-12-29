// DOM elementlarini olish
const movieSearchBox = document.getElementById("search");
const cards = document.querySelector(".cards");
const searchBtn = document.getElementById("search_btn");

// Kino qidirish tugmasi bosilganda
searchBtn && searchBtn.addEventListener("click", () => {
    const searchTerm = movieSearchBox.value.trim();

    if (searchTerm !== "") {
        fetchMovies(searchTerm);
    } else {
        alert("Iltimos, kino nomini kiriting!");
    }
});

// Kino qidirish funksiyasi
function fetchMovies(searchTerm) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchTerm}`)
        .then(data => data.json())
        .then(dataJson => {
            let lists = '';

            if (dataJson.results.length === 0) {
                alert(`"${searchTerm}" degan kino topilmadi!`);
                return;
            }

            dataJson.results.forEach(movie => {
                if (movie.vote_average >= 7) {
                    lists += `
                        <div class="card">
                            <div class="movie-poster">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}">
                            </div>
                            <div class="movie-info">
                                <h3 class="movie-title">${movie.original_title}</h3>
                                <ul class="movie-misc-info">
                                    <li class="year">Yil: ${movie.release_date}</li>
                                    <li class="rated">Bahosi: ${movie.vote_average}</li>
                                </ul>
                                <p class="language"><b>Tili:</b> ${movie.original_language}</p>
                                <p class="overview"><b>Ta’rif:</b> ${movie.overview}</p>
                                <span class="bookmark" data-movie-id="${movie.id}"><i class="fa-regular fa-bookmark"></i></span>
                            </div>
                        </div>
                    `;
                }
            });

            cards.innerHTML = lists;
            attachBookmarkEvents(dataJson.results);
        })
        .catch(err => console.error("Xatolik yuz berdi:", err));
}

// Bookmark tugmalariga event qo‘shish
function attachBookmarkEvents(movies) {
    const bookmarks = document.querySelectorAll('.bookmark');
    bookmarks.forEach(bookmark => {
        bookmark.addEventListener('click', function () {
            const movieId = this.dataset.movieId;
            const selectedMovie = movies.find(movie => movie.id == movieId);

            let savedMovies = localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : [];
            if (!savedMovies.some(m => m.id === selectedMovie.id)) {
                savedMovies.push(selectedMovie);
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                alert(`${selectedMovie.original_title} saqlandi!`);
            } else {
                alert(`${selectedMovie.original_title} allaqachon saqlangan!`);
            }
        });
    });
}

// Dastlabki mashhur kinolarni chiqarish
fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`)
    .then(data => data.json())
    .then(dataJson => {
        let lists = '';
        dataJson.results.forEach(movie => {
            if (movie.vote_average >= 7) {
                lists += `
                    <div class="card">
                        <div class="movie-poster">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}">
                        </div>
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.original_title}</h3>
                            <ul class="movie-misc-info">
                                <li class="year">Yil: ${movie.release_date}</li>
                                <li class="rated">Bahosi: ${movie.vote_average}</li>
                            </ul>
                            <p class="language"><b>Tili:</b> ${movie.original_language}</p>
                            <p class="overview"><b>Ta’rif:</b> ${movie.overview}</p>
                            <span class="bookmark" data-movie-id="${movie.id}"><i class="fa-regular fa-bookmark"></i></span>
                        </div>
                    </div>
                `;
            }
        });

        cards.innerHTML = lists;
        attachBookmarkEvents(dataJson.results);
    });

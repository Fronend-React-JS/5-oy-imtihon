const movieSearchBox = document.getElementById("search");
const cards = document.querySelector(".cards");
const searchBtn = document.getElementById("search_btn");
const inputSearchblock = document.getElementById("input_s_b");

searchBtn && searchBtn.addEventListener("click", () => {
    const searchTerm = movieSearchBox.value;

    if (searchTerm.trim() !== "") {
        fetchMovies(searchTerm);
    }
});

function fetchMovies(searchTerm) {
    
    fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchTerm}`
    )
        .then((data) => data.json())
        .then((dataJson) => {

            let lists = '';

            if (dataJson.results.length === 0) {
                alert(`"${searchTerm}" degan kino topilmadi `);
                return;
            }


            dataJson.results.forEach((movie) => {
                if (movie.vote_average >= 7) {
                    let card = `
                        <div class="card">
                            <div class="movie-poster">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie poster">
                            </div>
                            <div class="movie-info">
                                <h3 class="movie-title">${movie.original_title}</h3>
                                <ul class="movie-misc-info">
                                    <li class="year">Year: ${movie.release_date}</li>
                                    <li class="rated">Vote_average: ${movie.vote_average}</li>
                                </ul>
                                <p class="language"><b>Language:</b> ${movie.original_language}</p>
                                <p class="overview"><b>Overview:</b> ${movie.overview}</p>
                                <span class="bookmark"><i class="fa-regular fa-bookmark"></i></span>
                            </div>
                        </div>
                    `;

                    lists += card;
                }
            });


            cards.innerHTML = lists; 
        })
        .catch((error) => {
            console.log(error);
        });
}

fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=7`
)
    .then((data) => data.json())
    .then((dataJson) => {
        
        let lists = '';
        const cards = document.querySelector(".cards");         
        dataJson.results.forEach((movie) => {
            if (movie.vote_average >= 7) {
                let card = `
                    <div class="card">
                        <div class="movie-poster">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie poster">
                        </div>
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.original_title}</h3>
                            <ul class="movie-misc-info">
                                <li class="year">Year: ${movie.release_date}</li>
                                <li class="rated">Vote_average: ${movie.vote_average}</li>
                            </ul>
                            <p class="language"><b>Language:</b> ${movie.original_language}</p>
                            <p class="overview"><b>Overview:</b> ${movie.overview}</p>
                            <span class="bookmark" data-movie-id="${movie.id}"><i class="fa-regular fa-bookmark"></i></span>
                        </div>
                    </div>
                `;
        
                lists += card;
            }
        });
        
        cards.innerHTML += lists;
        
        const bookmarks = document.querySelectorAll('.bookmark');
        
        bookmarks.forEach((bookmark) => {
            bookmark.addEventListener('click', function () {
                const movieId = this.dataset.movieId;
        
                const selectedMovie = dataJson.results.find((movie) => movie.id == movieId);
        
                localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
            });
        });
        
    })
    .catch((error) => {
        console.log(error);
    });

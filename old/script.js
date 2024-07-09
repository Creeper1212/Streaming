// API Key
const apiKey = '0750b3ed2cd386ac84492758e9f3d5b6'; // Replace with your actual API key

// DOM Elements
const featuredMovieList = document.getElementById('featured-movie-list');
const searchResultsList = document.getElementById('search-results-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fetch and Display Latest Movies
fetchLatestMovies();

async function fetchLatestMovies() {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayMovies(data.results, featuredMovieList);
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    handleFetchError();
  }
}

// Search Functionality
searchButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent page refresh
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchMovies(query, searchResultsList);
    searchResultsList.innerHTML = ""; // Clear previous results
    searchResultsList.parentElement.style.display = "block";
    featuredMovieList.parentElement.style.display = "none";
  }
});

async function fetchMovies(query, containerId) {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayMovies(data.results, containerId);
  } catch (error) {
    console.error("Error fetching movies:", error);
    handleFetchError();
  }
}

// Display Movies
function displayMovies(movies, containerId) {
  containerId.innerHTML = ""; // Clear previous movies
  movies.forEach(movie => {
    const movieItem = createMovieItem(movie);
    containerId.appendChild(movieItem);
  });
}

// Create Movie Item
function createMovieItem(movie) {
  const movieItem = document.createElement('div');
  movieItem.classList.add('col-md-3', 'mb-4');

  const movieLink = document.createElement('a');
  movieLink.href = `movie-player.html?tmdbId=${movie.id}`;

  const moviePoster = document.createElement('img');
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  moviePoster.alt = movie.title;
  moviePoster.classList.add('img-fluid', 'rounded');

  const movieTitle = document.createElement('h5');
  movieTitle.textContent = movie.title;

  const movieOverview = document.createElement('p');
  movieOverview.textContent = movie.overview.slice(0, 100) + "...";

  const movieRating = document.createElement('p');
  movieRating.textContent = `★ ${movie.vote_average.toFixed(1)}`;

  const movieReleaseDate = document.createElement('p');
  movieReleaseDate.textContent = `Released: ${movie.release_date.slice(0, 4)}`;

  movieLink.appendChild(moviePoster);
  movieLink.appendChild(movieTitle);
  movieLink.appendChild(movieOverview);
  movieLink.appendChild(movieRating);
  movieLink.appendChild(movieReleaseDate);
  movieItem.appendChild(movieLink);

  return movieItem;
}

// Handle Fetch Errors
function handleFetchError() {
  // Handle errors gracefully, e.g., display a message to the user.
  alert("An error occurred while fetching data. Please try again later.");
}

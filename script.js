document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchMovies(query);
  });
  
  async function searchMovies(query) {
    const apiKey = '31c79ece'; // Replace with your OMDB API Key
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.Response === 'True') {
        displayMovies(data.Search);
      } else {
        document.getElementById('movies-container').innerHTML = `<p>No movies found!</p>`;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('movies-container').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
  }
  
  function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';
  
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
  
      // Add an anchor tag wrapping the image
      movieCard.innerHTML = `
        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
        </a>
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;
  
      moviesContainer.appendChild(movieCard);
    });
  };
  
  
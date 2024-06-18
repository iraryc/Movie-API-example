async function fetchMovies() {
  try {
    const response = await fetch("http://localhost:3000/movies");
    const movies = await response.json();
    const tableBody = document.getElementById("movieTable");
    tableBody.innerHTML = ""; // Clear existing rows

    movies.forEach((movie) => {
      addMovieToTable(movie);
    });
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
}

function addMovieToTable(movie) {
  const tableBody = document.getElementById("movieTable");
  const row = `<tr>
                    <td>${movie.id}</td>
                    <td>${movie.title}</td>
                    <td>${movie.director}</td>
                    <td>${movie.year}</td>
                    <td>${movie.length_minutes}</td>
                 </tr>`;
  tableBody.innerHTML += row;
}

// Initial fetch of movies
fetchMovies();

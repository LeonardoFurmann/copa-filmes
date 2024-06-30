
import * as api from "./api.js"

let movies = [];
let temp = [];
let moviesRound = [];
let tamanho = 0;

const options = { method: 'GET', headers: { accept: 'application/json' } };
const base_url_img = "https://image.tmdb.org/t/p/original"
const contador = document.getElementById("contador");
const div_movies = document.querySelectorAll('.movie');

div_movies.forEach((div_movie) => {
  div_movie.addEventListener('click', () => {
    selectMovie(div_movie)
  });
});

async function fetchMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api.api_key}&language=pt-BR&page=1`, options);
  const data = await response.json();
  movies = data.results.slice(0, 16);
  tamanho = movies.length;
  console.log('fetch')
}


async function startMovies() {
  //if (localStorage.getItem('isTournamentStarted') === 'true') {
  console.log(true)
  await fetchMovies();
  await startRound();
  localStorage.removeItem('isTournamentStarted');
  // } 
}

async function startRound() { 
  if (temp.length === (tamanho / 2)) {
    console.log("temp if ", temp.length)
    tamanho = (tamanho / 2);
    contador.innerText = `${tamanho} filmes`;
    movies = temp;
    temp = [];
  }

  shuffle(movies);

  console.log("movies ", movies)

  div_movies.forEach((movie) => {
    console.log(movies[0]);
    movie.children[0].src = base_url_img + movies[0].poster_path
    movie.children[1].innerText = movies[0].title;
    movie.dataset.id = movies[0].id;
    moviesRound.unshift(movies[0]);
    movies.shift() //remove filme da lista, pq ele já foi
  })

}

async function selectMovie(div_movie) {
  const selectedMovie = getMovieById(div_movie.dataset.id);
  temp.unshift(selectedMovie);

  if (movies.length == 0 && temp.length == 0) {   //verificar depois
    console.log(`o filme ${selectedMovie.title} ganhou!!!!`);
    return
  }
  moviesRound = [];
  await startRound()
  console.log("temp ", temp.length)
}

function getRandom(array) {
  const num = Math.floor(Math.random() * (array.length - 1));
  const movie = array[num];
  movie.jaFoi = true;
  return array[num];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}


function removeMovie(movie) {
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
 console.log("filme removido", movies[index].title)
}

function getMovieById(id) {
  return moviesRound.find(movie => movie.id == id)
}



startMovies();




// fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`, options)
//     .then(response => response.json())
//     .then(data => {
//         filmes = data.results;
//         const img = base_url_img + filmes[0].poster_path;
//         const img2 = base_url_img + filmes[4].poster_path;
//         filme1.src = img;
//         filme2.src = img2;
//         nome_filme.innerText = filmes[0].title;
//         nome_filme2.innerText = filmes[4].title;
//     })
//     .catch(err => console.error(err));


// if (new URLSearchParams(window.location.search).get('startTournament') === 'true') {
//     console.log('começou')
//     await fetchMovies();
//     await startRound();
// }
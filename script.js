
import * as api from "./api.js"

let movies = [];
let temp = [];
let moviesRound = [];
const tamanho = 0;

const options = { method: 'GET', headers: { accept: 'application/json' } };
const base_url_img = "https://image.tmdb.org/t/p/original"


const contador = document.getElementById("contador");

const imgFilme1 = document.getElementById("img_movie1");
const imgFilme2 = document.getElementById("img_movie2");
const nameMovie1 = document.getElementById("name_movie1");
const nameMovie2 = document.getElementById("name_movie2");


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

  shuffle(movies);
  contador.innerText = `${movies.length} filmes`;
  

  div_movies.forEach((movie, index) => {
    movie.children[0].src = base_url_img + movies[index].poster_path  
    movie.children[1].innerText = movies[index].title;
    movie.dataset.id = movies[index].id;
    moviesRound.unshift(movies[index]);
    removeMovie(movies[index]) //remove filme da lista, pq ele já foi
  })

  console.log(movies)

}


async function selectMovie(div_movie) {

  if (temp.length == (movies.length / 2)) {

    movies = temp;
    temp = [];
    console.log("movies ", movies)
    console.log("temp ", temp)
    await startRound();
    return
  }

  const selectedMovie = getMovieById(div_movie.dataset.id);
  temp.unshift(selectedMovie);
  
  if (movies.length == 2 && temp.length == 0) {
    console.log(`o filme ${selectedMovie.title} ganhou!!!!` );
    return
  }


  moviesRound = [];
  await startRound()
  console.log("movies ", movies)
  console.log("temp ", temp)

}

function getRandom(array){
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
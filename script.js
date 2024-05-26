
const apiKey = "0";
const options = {method: 'GET', headers: {accept: 'application/json'}};


let movies = [];
const base_url_img = "https://image.tmdb.org/t/p/original"
const imgFilme1 = document.getElementById("movie1");
const imgFilme2 = document.getElementById("movie2");
const nameMovie1= document.getElementById("name_movie1");
const nameMovie2 = document.getElementById("name_movie2");


async function fetchMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`, options);
    const data = await response.json();
    movies = data.results;
    console.log('fetch')
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

async function startRound() {
    movies = shuffle(movies);
    const movie1 = movies[0];
    const movie2 = movies[1];

    imgFilme1.src = base_url_img + movie1.poster_path;
    imgFilme2.src = base_url_img + movie2.poster_path;
    nameMovie1.innerText = movie1.title;
    nameMovie2.innerText = movie2.title;
}


async function startMovies(){
    if (localStorage.getItem('isTournamentStarted') === 'true') {
        console.log(true)
        await fetchMovies();   
        await startRound();
        localStorage.removeItem('isTournamentStarted');
      } 

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
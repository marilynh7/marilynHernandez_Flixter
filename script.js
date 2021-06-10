console.log("page loaded");
const apiKey = "011647eee57bc654602e870e8f6281ce";
 
const movieForm = document.querySelector("form");
const movieArea = document.querySelector("#movieArea");
 
movieForm.addEventListener("submit", getResults);
 
async function getResults(event){
   event.preventDefault();
   clearHTML();
   console.log("In get results function");
 
   const userInput = event.target.search;
   const input = userInput.value;
   console.log(input);
 
   const apiURL = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+input+"&page=1&include_adult=false";
   const response = await fetch(apiURL);
   const responseData = await response.json();
   console.log(responseData);
 
   responseData.results.forEach((el) => displayResults(el));
 
// https://image.tmdb.org/t/p/original/(backdrop_path)
}

function displayResults(movieData){
   //console.log(movieData.backdrop_path);
   let moviePoster = movieData.poster_path;
   let movieTitle = movieData.original_title;
   let movieRating = movieData.vote_average;
   console.log(movieTitle);
   console.log(movieRating);
   let posterSrc = "https://image.tmdb.org/t/p/original/"+moviePoster;
   //console.log(posterSrc);
   movieArea.innerHTML += `
   <div id="movieInfo">

      <img id = "poster" src="${posterSrc}" alt="Movie Poseter"> </img>
      <h4 id= "titles">${movieTitle} </h4>
      <div id="ratings">
         <p>&#11088;</p>
         <h3 id= "rating">${movieRating} </h3>
      </div>
   </div>    
   `
}

// for every new search it clears out the website area 
function clearHTML(){
   movieArea.innerHTML = `

   `
}

const trendingArea = document.querySelector("#movieArea");
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
//display the trending movies on the main page 
async function getTrending(){
   const playingNow = "https://api.themoviedb.org/3/movie/now_playing?api_key="+apiKey+"&language=en-US&page=1";
   let response = await fetch(playingNow);
   let responseData = await response.json();
   console.log(responseData);
   responseData.results.forEach((el) => displayTrending(el));
}


function displayTrending(movieData){
   let moviePoster = movieData.poster_path;
   let movieTitle = movieData.original_title;
   let movieRating = movieData.vote_average;
   let posterSrc = "https://image.tmdb.org/t/p/original/"+moviePoster;

   trendingArea.innerHTML += `
      <div id="movieInfo">
         <img id="poster" src="${posterSrc}" alt="Trending Movie Poster"> </img>
         <h4 id = "titles">${movieTitle}</h4>
         <div id="ratings">
            <p>&#11088;</p>
            <h3 id=rating>${movieRating}</h3>
         </div>
      </div>
   `

}

getTrending();


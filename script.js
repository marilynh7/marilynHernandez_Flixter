//query selectors
const apiKey = "011647eee57bc654602e870e8f6281ce";
const movieForm = document.querySelector("form");
const movieArea = document.querySelector("#movieArea");
const search = document.querySelector("#search");
var trendingApiPage = 1;

//when you input text in the search bar getResults function is called 
search.addEventListener("input",getResults);

//get the seach movie data from the API and call displayResults
async function getResults(event){
   event.preventDefault();
   //clears the page after every search 
   clearHTML();
   //gets the value inputted in the search bar 
   const input = event.target.value;
   //if nothing is in the search bar go back to the last trending page 
   if(!input){
      getTrending(trendingApiPage);
   }
   const apiURL = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+input+"&page=1&include_adult=false";
   //Gets data from the API 
   const response = await fetch(apiURL);
   const responseData = await response.json();
   //For each element in result array will perform displayResults 
   responseData.results.forEach((el) => displayResults(el));
}

//dynaminaclly adds the searched movie results to HTML 
function displayResults(movieData){
   let moviePoster = movieData.poster_path;
   let movieTitle = movieData.original_title;
   let movieRating = movieData.vote_average;
   let posterSrc = "https://image.tmdb.org/t/p/original/"+moviePoster;
   movieArea.innerHTML += `
   <div id="movieInfo">
      <img class = "poster" src="${posterSrc}" alt="${movieTitle}"> </img>
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
   movieArea.innerHTML = ` `
}

const trendingArea = document.querySelector("#movieArea");

//get the trending movie data from the API and call displayTrending 
async function getTrending(trendingApiPage){
   const playingNow = "https://api.themoviedb.org/3/movie/now_playing?api_key="+apiKey+"&language=en-US&page="+trendingApiPage;
   let response = await fetch(playingNow);
   responseData = await response.json();
   console.log(responseData);
   responseData.results.forEach((el) => displayTrending(el));
}

//dynamically add the trending movies to the HTML 
function displayTrending(movieData){
   let moviePoster = movieData.poster_path;
   let movieTitle = movieData.original_title;
   let movieRating = movieData.vote_average;
   let posterSrc = "https://image.tmdb.org/t/p/original/"+moviePoster;
   let id = movieData.id;
   console.log(trendingApiPage);
   trendingArea.innerHTML += `
      <div id="movieInfo">
         <img class="poster" src="${posterSrc}" alt="Trending Movie Poster" name="${id}" > </img>
         <h3 id = "titles">${movieTitle}</h3>
         <div id="ratings">
            <p>&#11088;</p>
            <h3 id=rating>${movieRating}</h3>
         </div>
      </div>
   `

}

//show trending movies on main page 
getTrending(trendingApiPage);


//Add more movies to the trending page when load button is clicked 
const loadButton = document.querySelector(".load");
async function loadMoreClick(event){
      trendingApiPage++;
      getTrending(trendingApiPage);
   }
   

loadButton.addEventListener('click',loadMoreClick);



//in progress...working on the display more info popup
 document.body.addEventListener('click', (event)=>{
    info(event);
 })


 async function info(event){
    if(event.target.matches(".poster")){
       var id = event.target.name;         //holds the id of my movie
       console.log(id);
       const movieURL = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+apiKey+"&language=en-US";
       const response = await fetch(movieURL);
       const responseData = await response.json();
       displayOverview(responseData);
    }
 }

 const infoArea = document.querySelector("#infoPage");
 function displayOverview(data){
    console.log(data.overview);
    infoArea.innerHTML += `
    <div id="popBox">
      
      <h3>"${data.overview}"</h3>
    </div>
      
    `

 }
  




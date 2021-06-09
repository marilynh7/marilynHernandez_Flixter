console.log("page loaded");
const apiKey = "011647eee57bc654602e870e8f6281ce";
 
const movieForm = document.querySelector("form");
const movieArea = document.querySelector("#movieArea");
 
movieForm.addEventListener("submit", getResults);
 
async function getResults(event){
   event.preventDefault();
   console.log("In get results function");
 
   const userInput = event.target.search;
   const input = userInput.value;
   console.log(input);
 
   const apiURL = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+input+"&page=1&include_adult=false";
  // const imgURL =
   console.log
   const response = await fetch(apiURL);
   const responseData = await response.json();
   console.log(responseData);
 
   responseData.results.forEach((el) => displayResults(el));
 
// https://image.tmdb.org/t/p/original/(backdrop_path)
}

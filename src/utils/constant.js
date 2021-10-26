let API_KEY="7d689ed7cab24730c8370165dec80da3";
let ROOT_URL = "https://review-kt.herokuapp.com/api/v1/";
let signUpURL = ROOT_URL + "users/register";
let loginURL = ROOT_URL + "users/login";
let searchURL= `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
let addMovie = ROOT_URL + "movies";
let getUser = ROOT_URL + "users";
let getProfile = ROOT_URL + "users/profile/";

export {ROOT_URL, signUpURL, loginURL, searchURL, addMovie, getUser, getProfile, API_KEY};
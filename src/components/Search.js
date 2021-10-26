import React, {useState, useEffect} from 'react'
import {withRouter} from "react-router-dom";
import {searchURL, addMovie, API_KEY} from "../utils/constant";
import Loader from './Loader';


function Search(props) {
  let [loading, setLoading] = useState(false);
  let [movies, setMovies] = useState("");

  //search the movies and fetch its details 
  useEffect(() => {
    setLoading(true);
    fetch(searchURL + props.match.params.id)
    .then((res) => {
      if(!res.ok) {
        return res.json().then(({ error }) => {
          return Promise.reject(error);
      })
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data.results);
      setMovies(data.results)
      setLoading(false);
    })
    .catch((error) => console.log(error));
  }, [props.match.params.id]);

  // function to fetch a specific movie details
  async function getMovie(id) {
    try {
      let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
      let data = await response.json();
      let obj = {
        title: data.original_title,
        releaseDate: data.release_date,
        description: data.overview,
        movieId: data.id,
        image: data.poster_path
      }
      return obj;
    }catch(error) {
      console.log(error);
    }
  }

  // function to fetch cast of a movie
  async function getCast(id) {
    try{
      let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
      let data = await response.json();
      return data.cast.slice(0, 10).map(c => {
        return {
          name: c.original_name,
          image: c.profile_path
        }
      })
    }catch(error) {
      console.log(error);
    }
  } 

  //Add movie and cast data to database
  const handleClick = (id) => {
   
    Promise.all([getMovie(id), getCast(id)])
    .then((data) => {
      if(data[0] && data[1]) {
        fetch(addMovie, {
          method: "POST",
          body: JSON.stringify({...data[0], cast: [...data[1]]}),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then((res) => {
          if(!res.ok) {
            return res.json().then(({ error }) => {
              return Promise.reject(error);
          })
        }
          return res.json();
        })
        .then((data) => {
          props.history.push(`/movie/${id}`)
        })
        .catch((error) => console.log(error));
      }
    }); 
  }

  if(loading) {
    return <Loader />
  }

  return (
    <section className="px-12 sm:px-28 xl:px-48 py-16">
       <h2 className="text-3xl font-bold mb-6">Search results for <span className="text-red-500 text-4xl">"{props.match.params.id}"</span></h2>
      <div>
        {
          (movies && movies.length > 0) ? movies.map(movie => {
            return (
              <div key={movie.id} className="flex items-center cursor-pointer mb-8 shadow-custom p-4 rounded-md" onClick={() => handleClick(movie.id)}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="img" width="100" className="object-cover"/>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <h3 className="ml-4 text-lg sm:text-2xl font-bold">{movie.original_title}</h3>
                  <h4 className="ml-4 my-2 sm:my-0 sm:mx-4">({movie.release_date ? movie.release_date.split("-")[0] : ""})</h4>
                </div>
              </div>
            )
          }) : <h4 className="text-3xl font-bold">No results for this search</h4>
        }
      </div>
    </section>
  )
}

export default withRouter(Search);

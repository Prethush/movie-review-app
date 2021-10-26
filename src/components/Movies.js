import React, {useState, useEffect} from 'react'
import { addMovie } from '../utils/constant';
import Loader from './Loader';
import {Link} from "react-router-dom";

export default function Movies() {
  let [loading, setLoading] = useState(false);
  let [movies, setMovies] = useState(null);
  let [error, setError] = useState("");

  //fetch all the movies details stored in database
  useEffect(() => {
    setLoading(true);
    fetch(addMovie)
    .then((res) => {
      if(!res.ok) {
        return res.json().then(({ error }) => {
          return Promise.reject(error);
      })
      }
      return res.json();
    })
    .then((data) => {
      setMovies(data.movies || []);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setError("Not able to fetch movies");
    });
  }, []);

  if(error) {
    return <h2 className="text-red-500 text-xl font-bold">{error}</h2>
  }

  if(loading) {
    return <Loader/>
  }

  return (
    <section className="px-12 sm:px-28 xl:px-48 py-16">
      <article className="flex flex-wrap justify-between">
        {
          (movies && movies.length > 0) ? movies.map(movie => {
            return <div className="flex flex-col flex-100 md:flex-50 lg:flex-30 2xl:flex-25 mb-8 shadow-2xl rounded-md p-4" key={movie.movieId}>
              <img src={movie.image ? "https://image.tmdb.org/t/p/w500" + movie.image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt={movie.title} className="w-imgWidth h-imageHeight object-cover"/>
              <div className="p-4">
                <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                <p className="mb-3">{movie.description.slice(0, 100)} ...</p>
                <Link to={`/movie/${movie.movieId}`}>
                  <button className="bg-green-500 p-2 px-6 font-bold text-white rounded-md hover:bg-green-400">Read More</button>
                </Link>   
              </div>
            </div>
          }) : <h2 className="text-xl font-bold">No movies to show</h2>
        }
      </article>
    </section>
  )
}

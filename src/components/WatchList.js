import React, {useEffect, useState} from 'react'
import { addMovie } from '../utils/constant';
import Loader from './Loader';
import {Link} from "react-router-dom";

export default function WatchList(props) {
 let [loading, setLoading] = useState("");
 let [watchList, setWatchList] = useState("");

//  function to fetch all the movies in the user's watchlist
  useEffect(() => {
    setLoading(true);
      fetch(addMovie + "/" + props.username + "/watchList")
      .then((res) => {
        if(!res.ok) {
          return res.json().then(({ error }) => {
            return Promise.reject(error);
        })
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWatchList(data.movies || []);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    }, [props.username]);
  
  if(loading) {
    return < Loader />
  }
  return (
    <div>
      <h2 className="text-3xl mb-6 font-bold mt-12">Watch List:</h2>
      <div>
        {
          watchList.length > 0 ? watchList.map(movie => {
            return (
             < Link to={`/movie/${movie.movieId}`} key={movie._id}>
                <div  className="flex items-center mb-6 shadow-custom p-4 rounded-md">
                <div>
                  < img src={movie.image ? "https://image.tmdb.org/t/p/w500" + movie.image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt={movie.title} className="max-w-xl h-36 object-cover "/>
                </div>
                <div className="mx-3">
                  <h3 className="text-lg sm:text-2xl font-bold mb-2">{movie.title}</h3>
                </div>
              </div>
             </Link>
            )
          }) : <h3 className="text-xl font-bold">No movies in the watch list</h3>
        }
      </div>
    </div>
  )
}

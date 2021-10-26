import React, {useState, useEffect, useContext} from 'react'
import { withRouter } from 'react-router-dom';
import { addMovie } from '../utils/constant';
import Loader from './Loader';
import ReviewBox from './ReviewBox';
import UserContext from '../context/userContext';

function Movie(props) {
  let [movie, setMovie] = useState("");
  let [loading, setLoading] = useState(false);
  let id = props.match.params.id;
  let userData = useContext(UserContext);
  let [watching, setWatching] = useState("");
  let [error, setError] = useState("");

 //fetching a specific movie details
  useEffect(() => {
    setLoading(true);
    fetch(addMovie + "/" + id, {
      method: "GET",
      headers: {
        "Authorization": localStorage.reviewToken 
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
      console.log(data.movie, "movie");
      setMovie(data.movie);
      setWatching(data.movie.watching);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setError("Not able to fetch movies");
    });
  }, [id, watching]);

  //adding and deleting movies in the watchlist
  const manageWatchList = () => {
    let isWatching = watching ? "DELETE" : "POST";
    fetch(addMovie + "/" + id + "/addWatchList", {
      method: isWatching,
      headers: {
        "Authorization": localStorage.reviewToken
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
      console.log(data);
      setWatching(!watching)
    })
    .catch((error) => console.log(error));
  }

  const getDate = (date) => {
    let newDate = new Date(date).toDateString();
    return newDate;
  }

  if(error) {
    return <h2 className="text-red-500 text-xl font-bold text-center my-8">{error}</h2>
  }
  
  if(loading) {
    return <Loader/>
  }
  return (
   <section className="px-12 sm:px-28 xl:px-48 py-16">
     <article>
       {
         movie ? <div>
          <div className="flex flex-col 2xl:flex-row 2xl:items-center">
            <div className="flex-100 sm:flex-50 2xl:flex-30 mr-12">
                <img src={movie.image ? "https://image.tmdb.org/t/p/w500" + movie.image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt={movie.title} className="object-cover rounded-md"/>
            </div>
            <div className="mt-8 2xl:mt-0 flex-70">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">{movie.title}</h2>
              <h3 className="sm:text-xl text-2xl font-bold mb-6">Release Date: {getDate(movie.releaseDate)}</h3>
              <p className="text-lg font-bold mb-4">Plot: {movie.description}</p>
              <h4 className="text-2xl font-bold mb-2">Cast:</h4>
                <div className="mb-6">
                {
                  movie.cast.length > 0 ? movie.cast.map((c, i) => {
                    return <div key={i}>
                      <h4 className="text-xl font-bold mb-2">{c.name}</h4>
                    </div>
                  }): <h3 className="text-xl font-bold">No cast details available</h3>
              }
                </div>
                {
                  userData.isLoggedIn ? <span onClick={() => manageWatchList()} className="cursor-pointer bg-green-500 text-white font-bold p-3 px-6 rounded-md hover:bg-green-400">{!watching ? "Add to Watch List" : "Remove from Watch List"}</span> : ""
                }
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mt-12 mb-8">Cast Details:</h3>
          <div className="flex flex-wrap">
          {
            movie.cast.length > 0 ? movie.cast.map((c, i) => {
              return <div key={i} className="mx-2 mb-6">
                <img src={c.image ? "https://image.tmdb.org/t/p/w500" + c.image : "https://media.istockphoto.com/vectors/black-linear-photo-camera-like-no-image-available-vector-id1055079680?k=20&m=1055079680&s=612x612&w=0&h=ujFxkvnp-VclErGByAsr2RYLJObedAtK7NNLgNJY_8A="} alt={c.name} className=" object-cover h-80 rounded-md"/>
              </div>
            }): <h3 className="text-xl font-bold">No cast images available</h3>
          }
          </div>
         </div> : ""
       }
     </article>

     < ReviewBox id={id} />
   </section>
  )
}

export default withRouter(Movie);
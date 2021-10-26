import React from 'react'
import Loader from './Loader'
import {Link} from "react-router-dom";

export default function ReviewedMovies(props) {

  if(!props.userReviews) {
    return < Loader />
  }

  return (
    <div>
      {
        props.userReviews.length > 0 ? props.userReviews.map((review) => {
          return (
              < Link to={`/movie/${review.movieId}`} key={review._id}>
                <div className="flex items-center mb-6 shadow-custom p-4 rounded-md">
                <div>
                  <img src={review.movieImage ? "https://image.tmdb.org/t/p/w500" + review.movieImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt={review.movieName} className="max-w-xl h-36  object-cover"/>
                </div>
                <div className="flex flex-col mx-3">
                  <h4 className="text-lg sm:text-2xl font-bold mb-2">{review.movieName}</h4>
                  <div className="flex flex-col sm:flex-row">
                    <div>
                      {
                        [1, 2, 3, 4, 5].map((v, i) => {
                          return <i key={i} className={"fas fa-star" + (review.author.rating >= v ? " text-yellow-400": "")}></i>
                        })
                      }
                    </div>
                    <h4 className="mx-3">{review.text}</h4>
                  </div>
                </div>
              </div>
              </Link>
          )
        }) : <h2 className="text-xl font-bold">No reviewed movies</h2>
      }
    </div>
  )
}

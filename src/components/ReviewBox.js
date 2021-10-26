import React, {useState, useEffect, useContext, useCallback} from 'react'
import UserContext from '../context/userContext'
import { addMovie } from '../utils/constant';
import Reviews from './Reviews';

export default function ReviewBox(props) {
  let [reviews, setReviews] = useState("");
  let [rating, setRating] = useState("");
  let [review, setReview] = useState("");
  let [error, setError] = useState("");
  let userData = useContext(UserContext);
  let movieId = props.id;

  //function to fetch all the reviews for a movie
  const getMovieReviews = useCallback(
    () => {
      fetch(addMovie + "/" + movieId + "/review")
    .then((res) => {
      if(!res.ok) {
        return res.json().then(({ error }) => {
          return Promise.reject(error);
      })
      }
      return res.json();
    })
    .then((data) => {
      console.log(data, "data");
      setReviews(data.reviews);
    })
    .catch((error) => console.log(error));
  }, [movieId],
  )

  useEffect(() => {
    getMovieReviews();
  }, [getMovieReviews])

  // Add review to a movie
  const handleReview = () => {
    if(rating && review) {
      fetch(addMovie + "/" + movieId + "/review", {
        method: "POST",
        body: JSON.stringify({review: {text: review, movieId, author: {rating}}}),
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.reviewToken
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setReview("");
        setRating("");
        getMovieReviews();
        setError("");
        console.log(data);
      })
      .catch((err) => console.log(err));
    }else {
      setError("Add both ratings and review");
    }
  }

  //Delete a review 
  const handleDelete = (id) => {
    fetch(addMovie + "/" + movieId + "/review/" + id, {
      method: "DELETE",
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
      getMovieReviews();
    })
    .catch((error) => console.log(error));
  }
  
  return (
   <div>
     <div>
       {
          userData.isLoggedIn ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold my-3">Post your Rating</h2>
              <div className="mb-6">
                {
                  [1, 2, 3, 4, 5].map((v, i) => {
                    return <i key={i} className={"fas fa-star cursor-pointer text-xl sm:text-2xl" + (rating >= v ? " text-yellow-400": "") } data-id={v} onClick={() => setRating(v)}></i>
                  })
                }
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Add your Review</h2>
              <div>
                <span className="text-red-500 mb-4 block">{error}</span>
                <textarea rows="6" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Add review" className="border-2 border-gray-300 outline-none focus:border-blue-500 block w-full p-4 rounded-md mb-6"></textarea>
                <button onClick={handleReview} className="py-2 px-6 bg-green-500 hover hover:bg-green-400 rounded-md text-white font-bold">Add Review</button>
              </div>
            </>
          ) : ""
       }
     </div>
     <div>
       <h2 className="text-2xl sm:text-3xl my-6 font-bold">Reviews</h2>
       < Reviews reviews={reviews} handleDelete={handleDelete}/>
     </div>
   </div>
  )
}

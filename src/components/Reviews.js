import React, {useContext} from 'react';
import UserContext from '../context/userContext';
import Loader from './Loader';
import {Link} from "react-router-dom";

export default function Reviews(props) {

  let userData = useContext(UserContext);
  const getDate = (date) => {
    let newDate = new Date(date).toDateString();
    return newDate;
  }

  if(!props.reviews) {
    return < Loader />
  }
  return (
    <div>
      {
        props.reviews.length > 0 ? props.reviews.map(review => {
          return (
         
              <div className="flex items-center mb-6 shadow-custom p-4 rounded-md relative" key={review._id}>
              < Link to={`/profile/${review.author.authorname}`} >
                <div>
                  <img src={"https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png"} alt={review.author.authorname} className="w-28 h-28 rounded"/>
                </div>
              </Link>
          
              <div className="flex flex-col mx-3">
               <div className="flex text-lg sm:text-xl font-bold mb-2 flex-col sm:flex-row">
                <h4 className="mr-2">{review.author.authorname}</h4>
                <h4>#{getDate(review.createdAt)}</h4>
               </div>
               <div className="flex flex-col sm:flex-row">
                 <h4 className="mr-3">{review.text}</h4>
                 <div className="">
                      {
                        [1, 2, 3, 4, 5].map((v, i) => {
                          return <i key={i} className={"fas fa-star" + (review.author.rating >= v ? " text-yellow-400": "")}></i>
                        })
                      }
               </div>
              </div>
            </div>
           {
             (userData.isLoggedIn && (review.author.authorname === userData.user.username)) ? <span onClick={() => props.handleDelete(review._id)}><i className="fas fa-trash-alt cursor-pointer text-2xl absolute right-4 text-red-500"></i></span> : ""
           }
          </div>
          )
        }) : <h2 className="text-xl font-bold">No Reviews yet</h2>
      }
    </div>
  )
}

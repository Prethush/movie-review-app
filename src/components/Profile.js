import React, {useState, useEffect, useContext, useCallback} from 'react'
import { getProfile, getUser} from '../utils/constant';
import Loader from './Loader';
import { withRouter, Link} from 'react-router-dom';
import { getDate } from '../utils/validate';
import UserContext from '../context/userContext';
import ReviewedMovies from './ReviewedMovies';
import WatchList from './WatchList';

function Profile(props) {
  let [user, setUser] = useState("");
  let [loading, setLoading] = useState(false);
  let [userReviews, setUserReviews] = useState("");
  let username = props.match.params.username;
  let userData = useContext(UserContext);
  let loggedInUser = userData.user ? userData.user.username : "";
  
  //fetch details about the movies a specific user reviewd
  const getMovies = useCallback(
    () => {
      setLoading(true);
      fetch(getUser + "/" + username + "/movies")
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
      setUserReviews(data.userReviews ? data.userReviews : []);
      setLoading(false);
    })
    .catch((error) => console.log(error));
  }, [username],
  )

  //fetch user details
  useEffect(() => {
    setLoading(true);
    fetch(getProfile + username)
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
      setUser(data.user);
      setLoading(false);
      getMovies();
    })
    .catch((error) => console.log(error));
  }, [username, getMovies]);

  if(loading) {
    return < Loader />
  }

  return (
    <section>
      <div className="flex flex-col items-center p-8 bg-profileBg text-white">
        {
          user ? (
           <>
            <div className="pb-8">
              <img src={"https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png"} alt="user" className="w-40 h-40 rounded-full"/>
            </div>
            <div className="text-center">
              <h2 className="text-2xl my-2">{user.username}</h2>
              <h2 className="text-2xl my-2">{user.email}</h2>
              <h2 className="text-2xl my-2">Joined on: {getDate(user.createdAt)}</h2>
              <p className="text-xl text-pink-500 my-2">{user.bio}</p>
              {
                loggedInUser === username && (
                  < Link to={`/profile/${user.username}/update`}>
                    <button className="bg-green-500 rounded-md py-2 px-4 font-bold mt-2 hover:bg-green-400">Update Profile</button>
                  </Link>
                )
              }
            </div>
           </>
          ) : ""
        }
      </div>
     <div className="px-12 sm:px-28 xl:px-48 py-16">
      <h2 className="text-3xl mb-6 font-bold">Reviewed Movies:</h2>
      < ReviewedMovies userReviews={userReviews}/>
      < WatchList username={username}/>
     </div>
    </section>
  )
}

export default withRouter(Profile);
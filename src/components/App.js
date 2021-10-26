import React, {useState, useEffect} from 'react'
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../context/userContext';
import { getUser } from '../utils/constant';
import FullPageLoader from "./FullPageLoader";
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';
import ErrorBoundary from './ErrorBoundary';

export default function App() {
  let [isLoggedIn, setLoggedIn] = useState(false);
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(false);
  
  //check the user is logged in or not
  useEffect(() => {
    let token = localStorage.getItem("reviewToken");
    if(token) {
      setLoading(true);
      fetch(getUser, {
        method: "GET",
        headers: {
          "Authorization": token
        }
      })
      .then((res) => {
        if(!res.ok) {
          return res.json().then(({error}) => {
            return Promise.reject(error);
        }) 
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoggedIn(true);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    }
  }, []);

  //function to update the state when the user is logged in
  const handleUser = (user) => {
    setLoggedIn(true);
    setUser(user);
    localStorage.setItem("reviewToken", user.token);
  }

  //function to update the state when the user is logged out
  const handleLogout = () => {
    setUser("");
    setLoggedIn(false);
  }

  //display the loading page when the page is loading
  if(loading) {
    return < FullPageLoader />
  }
  return (
    <>
      < Router>
        < UserProvider value={{isLoggedIn, handleUser, user, handleLogout}}>
          < ErrorBoundary>
            < Header />
            {
              isLoggedIn ? < Authenticated /> : < Unauthenticated />
            }
          </ErrorBoundary>
        </UserProvider>
      </Router>
    </>
  )
}

import React, {useState, useContext} from 'react';
import { Link, NavLink  } from 'react-router-dom';
import { withRouter } from 'react-router';
import UserContext from '../context/userContext';

function Header(props) {
  let [search, setSearch] = useState("");
  let userData = useContext(UserContext);

  //function to handle the search
  const handleSearch = (e) => {
    if(e.keyCode === 13 && search ) {
      props.history.push(`/search/${search}`);
      setSearch("");
    }
  }

  //function to handle logout
  const logout = (e) => {
    localStorage.clear();
    userData.handleLogout();
    props.history.push('/');
  }

  return (
  
    <header className="body-font bg-indigo-900 text-white">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link to="/">
        <div className="flex items-center my-4 sm:my-6 xl:my-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-2xl font-bold">The Cinemaholic</span>
        </div>
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <div className="flex items-center border-2 border-gray-300 py-2 rounded-md p-1 mx-6 my-4 sm:my-6 xl:my-0 w-40 sm:w-80">
            <i className="fas fa-search px-2"></i>
            <input 
              type="text" 
              value={search}
              className="outline-none bg-indigo-900 w-full" 
              onChange={(e) => setSearch(e.target.value)} 
              onKeyDown={handleSearch}
              placeholder="Search Movie"/>
          </div>
          <div className="flex items-center my-4 sm:my-6 xl:my-0">
          {
             !userData.user? (
              <>
                <NavLink to="/register" activeClassName="text-red-500">
                  <span className="mx-4 font-bold text-xl">Register</span>
                </NavLink>
                <NavLink to="/login" activeClassName="text-red-500">
                  <span className="mx-4 font-bold text-xl">Login</span>
                </NavLink>
              </>
             ) : (
               <>
                <NavLink to={`/profile/${userData.user.username}`} activeClassName="text-red-500">
                 <span className="flex items-center mr-4 font-bold text-xl">
                    <i className="fas fa-user mr-2"></i>
                    <span>{userData.user.username}</span>
                 </span>
                </NavLink>
                <span className="cursor-pointer font-bold text-xl" onClick={logout}>Logout</span>
               </>
             )
           }
          </div>
      </nav>
    </div>
  </header>
  )
}

export default withRouter(Header);
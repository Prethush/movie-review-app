import React from 'react'
import {Link} from "react-router-dom";

export default function Nomatch() {
  return (
    <div className="text-center">
       <h2 className="text-red-700 text-xl pt-8 pb-6 font-bold">404 Page Not Found</h2>
       < Link to="/">
        <button className="bg-green-500 p-2 px-5 hover:bg-green-400 rounded-md text-white font-bold">home page</button>
       </Link>
    </div>
  )
}

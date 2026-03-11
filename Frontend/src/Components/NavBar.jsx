import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ user, setUser }) => {
    const navigate=useNavigate();
    const hanldeLogout=async()=>{
        await axios.post("http://localhost:5000/api/auth/logout");
        
        setUser(null)
        navigate("/")
    }
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      
      <Link to="/" className="font-bold">
        PERN AUTH
      </Link>

      <div>
        {user ? (
          <button onClick={hanldeLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mx-2">
              Login
            </Link>
            <Link to="/register" className="mx-2">
              Register
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default NavBar
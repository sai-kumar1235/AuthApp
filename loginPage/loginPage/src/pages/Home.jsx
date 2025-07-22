import React from 'react'
import Login from './Login'
import SignupForm from './Signup'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
function Home() {
  const {email,name}=useSelector(state=>state.auth)
  return (
    
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our App</h1>
        {name && email ? (
          <div className="user-info">
            <h2>Hello, {name}!</h2>
            <p>Email: {email}</p>
          </div>
        ) : (
          <p>Please login or signup to continue</p>
        )}
      </header>

      <main className="home-main">
        <div className="auth-buttons">
          <Link to="/login" className="auth-link login-link">
            <button className="btn btn-login">
              Login
            </button>
          </Link>
          
          <Link to="/signup" className="auth-link signup-link">
            <button className="btn btn-signup">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
</div>

  )
}

export default Home
// frontend/src/App.jsx
import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App(){
  const logged = typeof window !== 'undefined' && !!localStorage.getItem('token');
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Airline App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/admin">Admin</Link> | <Link to="/my-bookings">My Bookings</Link> | {logged ? <a href="#" onClick={()=>{
            localStorage.removeItem('token'); window.location.href = '/';
          }}>Logout</a> : <Link to="/login">Login</Link>}
        </nav>
      </header>
      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}


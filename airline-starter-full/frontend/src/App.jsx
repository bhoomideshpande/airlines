import React from 'react'
import { Outlet, Link } from 'react-router-dom'
export default function App(){
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Airline App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </nav>
      </header>
      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}

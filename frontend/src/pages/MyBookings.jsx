// frontend/src/pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import api, { setToken } from '../services/api';

export default function MyBookings(){
  const [bookings, setBookings] = useState([]);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) return;
    setToken(token);
    api.get('/bookings').then(r=> setBookings(r.data)).catch(()=>{});
  }, []);
  if (!localStorage.getItem('token')) return <div>Please login to see bookings.</div>;
  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length===0 ? <p>No bookings yet</p> : (
        <ul>
          {bookings.map(b => (
            <li key={b._id}>
              Flight: {b.flight?.flightNumber || b.flight} — {b.flight?.origin} → {b.flight?.destination} | Seats: {b.seats} | Price: ₹{b.totalPrice} | Status: {b.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

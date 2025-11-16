// frontend/src/pages/FlightDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { setToken } from '../services/api';

export default function FlightDetails(){
  const { id } = useParams();
  const nav = useNavigate();
  const [flight, setFlight] = useState(null);
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    api.get('/flights/' + id).then(r => setFlight(r.data)).catch(()=>{});
  }, [id]);

  async function book(){
    const token = localStorage.getItem('token');
    if (!token) { alert('Please login first'); nav('/login'); return; }
    setToken(token);
    try{
      const r = await api.post('/bookings', { flightId: id, seats });
      alert('Booked! Booking id: ' + r.data._id);
      nav('/my-bookings');
    }catch(err){
      alert(err?.response?.data?.error || 'Booking failed');
    }
  }

  if (!flight) return <div>Loading...</div>;
  return (
    <div>
      <h2>{flight.flightNumber} — {flight.origin} → {flight.destination}</h2>
      <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
      <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
      <p>Price: ₹{flight.price}</p>
      <p>Seats available: {flight.seatsAvailable}</p>
      <div>
        <label>Seats to book: <input type="number" min="1" max={flight.seatsAvailable} value={seats} onChange={e=>setSeats(Number(e.target.value))}/></label>
      </div>
      <button onClick={book}>Book</button>
    </div>
  );
}

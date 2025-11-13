// frontend/src/components/AdminCreateFlight.jsx
import React, { useState } from 'react';
import api from '../services/api';

export default function AdminCreateFlight(){
  const [form, setForm] = useState({
    flightNumber:'', origin:'', destination:'', departureTime:'', arrivalTime:'', seatsTotal:0, seatsAvailable:0, price:0
  });
  const [msg, setMsg] = useState('');

  function onChange(e){
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name==='seatsTotal' || name==='seatsAvailable' || name==='price' ? Number(value) : value }));
  }

  async function submit(e){
    e.preventDefault();
    try{
      await api.post('/flights', form);
      setMsg('Flight created successfully');
      setForm({flightNumber:'', origin:'', destination:'', departureTime:'', arrivalTime:'', seatsTotal:0, seatsAvailable:0, price:0});
    }catch(err){
      console.error(err);
      setMsg(err?.response?.data?.error || 'Create failed');
    }
  }

  return (
    <div>
      <h2>Create Flight (Admin)</h2>
      <form onSubmit={submit} style={{ maxWidth: 600 }}>
        <div><input name="flightNumber" value={form.flightNumber} onChange={onChange} placeholder="Flight Number" required/></div>
        <div><input name="origin" value={form.origin} onChange={onChange} placeholder="Origin" required/></div>
        <div><input name="destination" value={form.destination} onChange={onChange} placeholder="Destination" required/></div>
        <div><input name="departureTime" value={form.departureTime} onChange={onChange} placeholder="Departure (ISO)" required/></div>
        <div><input name="arrivalTime" value={form.arrivalTime} onChange={onChange} placeholder="Arrival (ISO)" required/></div>
        <div><input name="seatsTotal" type="number" value={form.seatsTotal} onChange={onChange} placeholder="Seats Total" required/></div>
        <div><input name="seatsAvailable" type="number" value={form.seatsAvailable} onChange={onChange} placeholder="Seats Available" required/></div>
        <div><input name="price" type="number" value={form.price} onChange={onChange} placeholder="Price" required/></div>
        <button type="submit">Create Flight</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

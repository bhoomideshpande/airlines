import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Home(){
  const [flights, setFlights] = useState([])
  useEffect(()=>{ api.get('/flights').then(r=>setFlights(r.data)).catch(()=>{}); },[])
  return (
    <div>
      <h2>Flights</h2>
      {flights.length===0 ? <p>No flights yet</p> : (
        <ul>
          {flights.map(f=> (
            <li key={f._id}>{f.flightNumber} - {f.origin} ➜ {f.destination} | ${f.price}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const nav = useNavigate()
  async function submit(e){
    e.preventDefault()
    try{ await api.post('/auth/register', { name, email, password }); alert('Registered'); nav('/login') }
    catch{ alert('Failed') }
  }
  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <div><input placeholder="name" value={name} onChange={e=>setName(e.target.value)} /></div>
      <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button>Register</button>
    </form>
  )
}

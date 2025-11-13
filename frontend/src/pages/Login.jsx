import React, { useState } from 'react'
import api, { setToken } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  async function submit(e){
    e.preventDefault()
    try{
      const r = await api.post('/auth/login', { email, password })
      setToken(r.data.token)
      localStorage.setItem('token', r.data.token)
      nav('/')
    }catch(err){ alert('Login failed') }
  }
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button>Login</button>
    </form>
  )
}

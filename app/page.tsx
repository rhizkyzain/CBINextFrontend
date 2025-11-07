'use client'
import { useState } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      console.log(data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.rolee)
      login(data.token, data.role)
      
      toast.success('Login successful!')
      router.push('/home')
    } catch (err) {
      console.error(err) 
      toast.error('Login failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-500 text-center text-blue-600">Login</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full mb-3 text-gray-500 p-2 border rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-3 p-2 text-gray-500 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-gray-500 py-2 rounded hover:bg-blue-700 transition">Login</button>
      </form>
    </main>
  )
}

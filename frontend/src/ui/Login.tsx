import { useState } from 'react'
import { login } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      nav('/')
    } catch (e: any) {
      setError(e?.message || 'Login failed')
    }
  }

  return (
    <div className="container max-w-md">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          {error && <div className="text-red-600">{error}</div>}
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}

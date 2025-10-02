import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getMe, logout } from '../utils/auth'

export default function App() {
  const nav = useNavigate()
  useEffect(() => {
    getMe().catch(() => nav('/login'))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-bold">Sales‑Tech‑Sync CRM</h1>
          <nav className="flex gap-4">
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/clients">Clients</NavLink>
            <NavLink to="/deals">Deals</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/payments">Payments</NavLink>
            <NavLink to="/activities">Activities</NavLink>
          </nav>
          <button className="btn" onClick={() => { logout(); nav('/login') }}>Logout</button>
        </div>
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
}

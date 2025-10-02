import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './ui/App'
import Login from './ui/Login'
import Dashboard from './ui/Dashboard'
import Clients from './ui/Clients'
import Deals from './ui/Deals'
import Payments from './ui/Payments'
import Projects from './ui/Projects'
import Activities from './ui/Activities'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Dashboard /> },
    { path: 'clients', element: <Clients /> },
    { path: 'deals', element: <Deals /> },
    { path: 'payments', element: <Payments /> },
    { path: 'projects', element: <Projects /> },
    { path: 'activities', element: <Activities /> },
  ]},
  { path: '/login', element: <Login /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

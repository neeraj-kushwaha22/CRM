import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Dashboard() {
  const [stats, setStats] = useState<any>({})
  useEffect(() => { (async () => {
    const [clients, deals, payments] = await Promise.all([
      api('/clients'), api('/deals'), api('/payments')
    ])
    const totalDue = payments.filter((p:any)=>p.status!=='PAID').reduce((s:any,p:any)=>s+p.amount,0)
    const pipeline = deals.reduce((s:any,d:any)=>s+d.value,0)
    setStats({ clients: clients.length, deals: deals.length, pipeline, due: totalDue })
  })() }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="card">Clients: <b>{stats.clients ?? '-'}</b></div>
      <div className="card">Deals: <b>{stats.deals ?? '-'}</b></div>
      <div className="card">Pipeline ₹: <b>{stats.pipeline ?? '-'}</b></div>
      <div className="card">Payments Due ₹: <b>{stats.due ?? '-'}</b></div>
    </div>
  )
}

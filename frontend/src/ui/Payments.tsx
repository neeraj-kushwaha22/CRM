import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Payments() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState<any>({ clientId:'', amount:'0', status:'PENDING', method:'' })

  const load = async () => setItems(await api('/payments'))
  useEffect(() => { load() }, [])

  const save = async (e: any) => {
    e.preventDefault()
    await api('/payments', { method: 'POST', body: JSON.stringify(form) })
    setForm({ clientId:'', amount:'0', status:'PENDING', method:'' })
    await load()
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <form onSubmit={save} className="grid md:grid-cols-4 gap-3">
          <input className="input" placeholder="clientId" value={form.clientId} onChange={e=>setForm({...form, clientId: e.target.value})} /><input className="input" placeholder="amount" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} /><input className="input" placeholder="status" value={form.status} onChange={e=>setForm({...form, status: e.target.value})} /><input className="input" placeholder="method" value={form.method} onChange={e=>setForm({...form, method: e.target.value})} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>
      <div className="card overflow-auto">
        <table className="table">
          <thead><tr><th>clientId</th><th>amount</th><th>status</th><th>method</th><th>ID</th></tr></thead>
          <tbody>
            {items.map((it:any)=> (
              <tr key={it.id}>
                <td>{it.clientId ?? ''}</td><td>{it.amount ?? ''}</td><td>{it.status ?? ''}</td><td>{it.method ?? ''}</td>
                <td>{it.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

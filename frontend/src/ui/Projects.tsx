import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Projects() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState<any>({ name:'', status:'PLANNING', clientId:'', notes:'' })

  const load = async () => setItems(await api('/projects'))
  useEffect(() => { load() }, [])

  const save = async (e: any) => {
    e.preventDefault()
    await api('/projects', { method: 'POST', body: JSON.stringify(form) })
    setForm({ name:'', status:'PLANNING', clientId:'', notes:'' })
    await load()
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <form onSubmit={save} className="grid md:grid-cols-4 gap-3">
          <input className="input" placeholder="name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} /><input className="input" placeholder="status" value={form.status} onChange={e=>setForm({...form, status: e.target.value})} /><input className="input" placeholder="clientId" value={form.clientId} onChange={e=>setForm({...form, clientId: e.target.value})} /><input className="input" placeholder="notes" value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>
      <div className="card overflow-auto">
        <table className="table">
          <thead><tr><th>name</th><th>status</th><th>clientId</th><th>notes</th><th>ID</th></tr></thead>
          <tbody>
            {items.map((it:any)=> (
              <tr key={it.id}>
                <td>{it.name ?? ''}</td><td>{it.status ?? ''}</td><td>{it.clientId ?? ''}</td><td>{it.notes ?? ''}</td>
                <td>{it.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

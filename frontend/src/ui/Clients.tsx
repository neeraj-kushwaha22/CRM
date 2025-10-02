import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Clients() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState<any>({ name:'', email:'', phone:'', address:'' })

  const load = async () => setItems(await api('/clients'))
  useEffect(() => { load() }, [])

  const save = async (e: any) => {
    e.preventDefault()
    await api('/clients', { method: 'POST', body: JSON.stringify(form) })
    setForm({ name:'', email:'', phone:'', address:'' })
    await load()
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <form onSubmit={save} className="grid md:grid-cols-4 gap-3">
          <input className="input" placeholder="name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} /><input className="input" placeholder="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} /><input className="input" placeholder="phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} /><input className="input" placeholder="address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>
      <div className="card overflow-auto">
        <table className="table">
          <thead><tr><th>name</th><th>email</th><th>phone</th><th>address</th><th>ID</th></tr></thead>
          <tbody>
            {items.map((it:any)=> (
              <tr key={it.id}>
                <td>{it.name ?? ''}</td><td>{it.email ?? ''}</td><td>{it.phone ?? ''}</td><td>{it.address ?? ''}</td>
                <td>{it.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

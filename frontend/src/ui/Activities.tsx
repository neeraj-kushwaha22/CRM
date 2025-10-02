import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Activities() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState<any>({ type:'NOTE', summary:'', clientId:'' })

  const load = async () => setItems(await api('/activities'))
  useEffect(() => { load() }, [])

  const save = async (e: any) => {
    e.preventDefault()
    await api('/activities', { method: 'POST', body: JSON.stringify(form) })
    setForm({ type:'NOTE', summary:'', clientId:'' })
    await load()
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <form onSubmit={save} className="grid md:grid-cols-4 gap-3">
          <input className="input" placeholder="type" value={form.type} onChange={e=>setForm({...form, type: e.target.value})} /><input className="input" placeholder="summary" value={form.summary} onChange={e=>setForm({...form, summary: e.target.value})} /><input className="input" placeholder="clientId" value={form.clientId} onChange={e=>setForm({...form, clientId: e.target.value})} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>
      <div className="card overflow-auto">
        <table className="table">
          <thead><tr><th>type</th><th>summary</th><th>clientId</th><th>ID</th></tr></thead>
          <tbody>
            {items.map((it:any)=> (
              <tr key={it.id}>
                <td>{it.type ?? ''}</td><td>{it.summary ?? ''}</td><td>{it.clientId ?? ''}</td>
                <td>{it.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

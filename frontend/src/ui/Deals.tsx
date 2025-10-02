import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Deals() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState<any>({ title:'', value:'0', stage:'LEAD', clientId:'' })

  const load = async () => setItems(await api('/deals'))
  useEffect(() => { load() }, [])

  const save = async (e: any) => {
    e.preventDefault()
    await api('/deals', { method: 'POST', body: JSON.stringify(form) })
    setForm({ title:'', value:'0', stage:'LEAD', clientId:'' })
    await load()
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <form onSubmit={save} className="grid md:grid-cols-4 gap-3">
          <input className="input" placeholder="title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} /><input className="input" placeholder="value" value={form.value} onChange={e=>setForm({...form, value: e.target.value})} /><input className="input" placeholder="stage" value={form.stage} onChange={e=>setForm({...form, stage: e.target.value})} /><input className="input" placeholder="clientId" value={form.clientId} onChange={e=>setForm({...form, clientId: e.target.value})} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>
      <div className="card overflow-auto">
        <table className="table">
          <thead><tr><th>title</th><th>value</th><th>stage</th><th>clientId</th><th>ID</th></tr></thead>
          <tbody>
            {items.map((it:any)=> (
              <tr key={it.id}>
                <td>{it.title ?? ''}</td><td>{it.value ?? ''}</td><td>{it.stage ?? ''}</td><td>{it.clientId ?? ''}</td>
                <td>{it.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

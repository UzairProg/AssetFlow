import React, { useEffect, useMemo, useState } from 'react'
import { useRealtime, Item } from '../../../context/RealtimeContext'

type Props = {
  collection: string
  title?: string
}

const indianPeople = [
  'Amit Kumar',
  'Neha Sharma',
  'Rahul Singh',
  'Pooja Patel',
  'Sanjay Rao',
  'Priya Verma',
  'Rohit Gupta',
  'Anita Desai',
  'Vikram Mehta',
  'Sakshi Jain',
]

const seedFor = (collection: string) => {
  const k = collection.toLowerCase()
  if (k.includes('department')) {
    return [
      { name: 'Finance', description: 'Finance department', location: 'Mumbai' },
      { name: 'Operations', description: 'Operations team', location: 'Bengaluru' },
      { name: 'Human Resources', description: 'HR & People', location: 'New Delhi' },
    ]
  }
  if (k.includes('asset')) {
    return [
      { name: 'Dell Latitude 7490', category: 'Laptop', location: 'Bengaluru' },
      { name: 'HP ProBook 450', category: 'Laptop', location: 'Mumbai' },
      { name: 'Lenovo ThinkPad T14', category: 'Laptop', location: 'New Delhi' },
    ]
  }
  if (k.includes('booking')) {
    return [
      { name: 'Conference Room A', bookedBy: 'Amit Kumar', date: '2026-07-15', slot: '10:00-11:00' },
      { name: 'Projector', bookedBy: 'Neha Sharma', date: '2026-07-16', slot: '14:00-15:00' },
    ]
  }
  if (k.includes('audit')) {
    return [
      { name: 'Quarterly Audit Q2', owner: 'Rahul Singh', status: 'Scheduled' },
      { name: 'Asset Verification July', owner: 'Priya Verma', status: 'In Progress' },
    ]
  }
  // default seed: people
  return indianPeople.slice(0, 6).map((n) => ({ name: n, role: 'Staff', location: 'Bengaluru' }))
}

const CrudManager: React.FC<Props> = ({ collection, title }) => {
  const { getCollection, createItem, updateItem, deleteItem } = useRealtime()
  const items = getCollection(collection)
  const [list, setList] = useState<Item[]>(items)
  const [form, setForm] = useState<Record<string, string>>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => setList(items), [items])

  useEffect(() => {
    if (!items || items.length === 0) {
      // seed with sensible Indian dummy data
      const seeds = seedFor(collection)
      seeds.forEach((s) => createItem(collection, s as unknown as Omit<Item, 'id'>))
    }
  }, [collection, createItem, items])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateItem(collection, editingId, form)
      setEditingId(null)
    } else {
      createItem(collection, form)
    }
    setForm({})
  }

  const startEdit = (it: Item) => {
    setEditingId(it.id)
    const copy: Record<string, string> = {}
    Object.keys(it).forEach((k) => {
      if (k === 'id') return
      const v = it[k]
      copy[k] = v === undefined || v === null ? '' : String(v)
    })
    setForm({ ...copy })
  }

  const onDelete = (id: string) => {
    if (confirm('Delete this item?')) deleteItem(collection, id)
  }

  const keys = useMemo(() => {
    const k = new Set<string>()
    list.forEach((it: Item) => Object.keys(it).forEach((kk) => k.add(kk)))
    return Array.from(k).filter((k) => k !== 'id')
  }, [list])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title || collection}</h3>
        <p className="text-sm text-slate-500">Realtime-ready (local only) · CRUD enabled</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-2 rounded border p-4">
        <div className="grid grid-cols-3 gap-3">
          <input
            placeholder="Name"
            value={form.name || ''}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="col-span-1 rounded border px-3 py-2"
          />
          <input
            placeholder="Department / Category"
            value={form.department || form.category || ''}
            onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
            className="col-span-1 rounded border px-3 py-2"
          />
          <input
            placeholder="Notes / Location"
            value={form.description || form.location || ''}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="col-span-1 rounded border px-3 py-2"
          />
        </div>
        <div className="flex gap-2">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">{editingId ? 'Save' : 'Add'}</button>
          <button
            type="button"
            onClick={() => {
              setForm({})
              setEditingId(null)
            }}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              {keys.map((k) => (
                <th key={k} className="text-left">
                  {k}
                </th>
              ))}
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((it: Item) => (
              <tr key={it.id} className="odd:bg-slate-50">
                <td className="py-2">{(it as any).name || (it as any).title || '—'}</td>
                {keys.map((k) => (
                  <td key={k} className="py-2">
                    {String(it[k] ?? '—')}
                  </td>
                ))}
                <td className="py-2">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(it)} className="rounded border px-2 py-1 text-sm">
                      Edit
                    </button>
                    <button onClick={() => onDelete(it.id)} className="rounded border px-2 py-1 text-sm text-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CrudManager

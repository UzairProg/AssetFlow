import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export type Item = { id: string; [k: string]: unknown }

type RealtimeContextValue = {
  getCollection: (name: string) => Item[]
  createItem: (collection: string, item: Omit<Item, 'id'>) => Item
  updateItem: (collection: string, id: string, patch: Partial<Item>) => Item | null
  deleteItem: (collection: string, id: string) => boolean
}

const STORAGE_KEY = 'assetflow_realtime_store_v1'

const RealtimeContext = createContext<RealtimeContextValue | null>(null)

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

const loadStore = (): Record<string, Item[]> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const saveStore = (store: Record<string, Item[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // ignore
  }
}

type BroadcastMessage =
  | { collection: string; type: 'create'; payload: Item }
  | { collection: string; type: 'update'; payload: Item }
  | { collection: string; type: 'delete'; payload: { id: string } }
  | { collection: string; type: 'sync_full'; payload: Item[] }

export const RealtimeProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<Record<string, Item[]>>(() => loadStore())

  const bc = useMemo(() => {
    try {
      // BroadcastChannel may not be available in some environments
      return new BroadcastChannel('assetflow_realtime_channel')
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    const onMessage = (ev: MessageEvent) => {
      const msg = ev.data as BroadcastMessage | undefined
      if (!msg || typeof msg !== 'object' || !('collection' in msg)) return
      const col = msg.collection
      setStore((prev) => {
        const next = { ...prev }
        if (msg.type === 'sync_full') {
          next[col] = msg.payload || []
        } else if (msg.type === 'create') {
          next[col] = [...(next[col] || []), msg.payload]
        } else if (msg.type === 'update') {
          next[col] = (next[col] || []).map((i) => (i.id === (msg.payload as Item).id ? (msg.payload as Item) : i))
        } else if (msg.type === 'delete') {
          next[col] = (next[col] || []).filter((i) => i.id !== (msg.payload as { id: string }).id)
        }
        saveStore(next)
        return next
      })
    }

    if (bc) {
      // BroadcastChannel typing is narrow in DOM libs; use any-cast for addEventListener
      ;(bc as any).addEventListener('message', onMessage)
      return () => (bc as any).removeEventListener('message', onMessage)
    }
  }, [bc])

  const broadcast = useCallback(
    (message: unknown) => {
      try {
        bc?.postMessage(message)
      } catch {
        // ignore
      }
    },
    [bc]
  )

  const getCollection = useCallback(
    (name: string) => {
      return store[name] || []
    },
    [store]
  )

  const createItem = useCallback(
    (collection: string, item: Omit<Item, 'id'>) => {
      const newItem = { ...item, id: generateId(), createdAt: new Date().toISOString() }
      setStore((prev) => {
        const next = { ...prev, [collection]: [...(prev[collection] || []), newItem] }
        saveStore(next)
        return next
      })
      broadcast({ collection, type: 'create', payload: newItem })
      return newItem
    },
    [broadcast]
  )

  const updateItem = useCallback(
    (collection: string, id: string, patch: Partial<Item>) => {
      let updated: Item | null = null
      setStore((prev) => {
        const list = prev[collection] || []
        const nextList = list.map((it) => {
          if (it.id !== id) return it
          const merged = { ...it, ...patch, updatedAt: new Date().toISOString() }
          updated = merged
          return merged
        })
        const next = { ...prev, [collection]: nextList }
        saveStore(next)
        return next
      })
      if (updated) broadcast({ collection, type: 'update', payload: updated })
      return updated
    },
    [broadcast]
  )

  const deleteItem = useCallback(
    (collection: string, id: string) => {
      let removed = false
      setStore((prev) => {
        const list = prev[collection] || []
        const nextList = list.filter((it) => it.id !== id)
        removed = nextList.length !== list.length
        const next = { ...prev, [collection]: nextList }
        saveStore(next)
        return next
      })
      if (removed) broadcast({ collection, type: 'delete', payload: { id } })
      return removed
    },
    [broadcast]
  )

  const value: RealtimeContextValue = {
    getCollection,
    createItem,
    updateItem,
    deleteItem,
  }

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
}

export const useRealtime = () => {
  const ctx = React.useContext(RealtimeContext)
  if (!ctx) throw new Error('useRealtime must be used within RealtimeProvider')
  return ctx
}

export default RealtimeContext

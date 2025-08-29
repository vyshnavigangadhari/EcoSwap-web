import { createContext, useContext, useMemo, useState } from 'react'
import { seedItems } from '../data/items.js'


const Ctx = createContext()


export function ItemsProvider({ children }){
const [items, setItems] = useState(seedItems)


const addItem = (item) => setItems(prev => [{
id: crypto.randomUUID(),
createdAt: Date.now(),
...item
}, ...prev])


const updateItem = (id, patch) => setItems(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it))


const value = useMemo(() => ({ items, addItem, updateItem }), [items])
return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}


export const useItems = () => useContext(Ctx)
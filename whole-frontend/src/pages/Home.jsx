import { useMemo, useState } from 'react'
import { useItems } from '../context/ItemsContext.jsx'
import ItemCard from '../components/ItemCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterBar from '../components/FilterBar.jsx'


export default function Home(){
const { items } = useItems()
const [q, setQ] = useState('')
const [filter, setFilter] = useState('ALL')
const [applied, setApplied] = useState({ q: '', filter: 'ALL' })


const list = useMemo(() => {
return items
.filter(it => applied.filter === 'ALL' ? true : it.status === applied.filter)
.filter(it => it.title.toLowerCase().includes(applied.q.toLowerCase()) || it.description.toLowerCase().includes(applied.q.toLowerCase()))
}, [items, applied])


return (
<section className="stack-lg">
<div className="row gap">
<SearchBar value={q} onChange={setQ} />
<FilterBar filter={filter} setFilter={setFilter} onApply={() => setApplied({ q, filter })} />
</div>


<div className="grid">
{list.map(item => <ItemCard key={item.id} item={item} />)}
{list.length === 0 && <p className="muted">No items match your filters.</p>}
</div>
</section>
)
}
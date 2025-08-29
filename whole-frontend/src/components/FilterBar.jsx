export default function FilterBar({ filter, setFilter, onApply }){
return (
<div className="filters">
<select className="select" value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter by status">
<option value="ALL">All</option>
<option value="AVAILABLE">Available</option>
<option value="PENDING">Pending</option>
<option value="SWAPPED">Swapped</option>
</select>
<button className="btn ghost" onClick={onApply}>Filter</button>
</div>
)
}
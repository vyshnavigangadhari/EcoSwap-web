import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'


export default function ItemCard({ item }){
return (
<article className="card">
<h3>{item.title}</h3>
<p className="muted">Owner: <strong>{item.owner}</strong> • Status: <StatusBadge status={item.status} /></p>
<p>{item.description}</p>
<div className="card-actions">
<Link className="btn" to={`/items/${item.id}`}>View details →</Link>
</div>
</article>
)
}
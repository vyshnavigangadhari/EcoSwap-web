export default function StatusBadge({ status }){
const map = {
AVAILABLE: 'badge green',
PENDING: 'badge yellow',
SWAPPED: 'badge gray',
}
return <span className={map[status] || 'badge'}>{status}</span>
}
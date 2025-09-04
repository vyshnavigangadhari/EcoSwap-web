export default function FilterBar({ filter, setFilter }) {
  return (
    <select
      className="select"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="ALL">All</option>
      <option value="AVAILABLE">Available</option>
      <option value="PENDING">Pending</option>
      <option value="SWAPPED">Swapped</option>
    </select>
  );
}


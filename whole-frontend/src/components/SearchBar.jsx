export default function SearchBar({ value, onChange, placeholder = 'Search items…' }) {
  return (
    <input
      className="input searchbar"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search items"
    />
  );
}

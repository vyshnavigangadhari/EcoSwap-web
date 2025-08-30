export default function StatusBadge({ status }) {
  const normalized = (status || "").toUpperCase();

  const map = {
    AVAILABLE: "badge green",
    PENDING: "badge yellow",
    SWAPPED: "badge gray",
  };

  return <span className={map[normalized] || "badge"}>{normalized}</span>;
}

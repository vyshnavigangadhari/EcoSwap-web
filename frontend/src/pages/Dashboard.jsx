import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import itemService from "../services/itemService";
import swapService from "../services/swapService";
import ItemCard from "../components/ItemCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [swapHistory, setSwapHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user items
  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        try {
          const res = await itemService.getUserItems(user._id);
          setItems(res);
        } catch (err) {
          console.error("Error fetching items:", err);
        }
      }
    };
    fetchItems();
  }, [user]);

  // Fetch swap history
  useEffect(() => {
    const fetchSwapHistory = async () => {
      if (user) {
        try {
          const res = await swapService.getSwapHistory(user._id);
          setSwapHistory(res);
        } catch (err) {
          console.error("Error fetching swap history:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSwapHistory();
  }, [user]);

  if (!user) return <p className="p-4">Please login to view dashboard.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">SwapCoins: {user.swapCoins}</p>

      {/* My Items */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">My Items</h3>
        {items.length === 0 ? (
          <p>You have no items listed.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Swap History */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Swap History</h3>
        {loading ? (
          <p>Loading swap history...</p>
        ) : swapHistory.length === 0 ? (
          <p>No swap history found.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Item</th>
                <th className="border px-2 py-1">Requester</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Coins</th>
              </tr>
            </thead>
            <tbody>
              {swapHistory.map((swap) => (
                <tr key={swap._id}>
                  <td className="border px-2 py-1">{swap.itemName}</td>
                  <td className="border px-2 py-1">{swap.requesterName}</td>
                  <td className="border px-2 py-1">{swap.status}</td>
                  <td className="border px-2 py-1">{swap.coins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

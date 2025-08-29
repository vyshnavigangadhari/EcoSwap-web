import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import itemService from "../services/itemService";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await itemService.getItemById(id);
        setItem(res);
      } catch (err) {
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!item) return <p className="p-4">Item not found.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">{item.name}</h2>
      {item.image && (
        <img src={item.image} alt={item.name} className="w-full h-64 object-cover mb-2 rounded" />
      )}
      <p className="mb-2">{item.description}</p>
      <p className="text-gray-600">Owner: {item.ownerName}</p>
      <p className="text-gray-600">SwapCoins: {item.coins}</p>
    </div>
  );
};

export default ItemDetail;

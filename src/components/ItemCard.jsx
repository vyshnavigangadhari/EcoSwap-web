const ItemCard = ({ item }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h4 className="font-bold text-lg mb-2">{item.name}</h4>
      <p className="text-gray-700 mb-2">{item.description}</p>
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}
      <p className="text-sm text-gray-500">Owner: {item.ownerName}</p>
      <p className="text-sm text-gray-500">Coins: {item.coins}</p>
    </div>
  );
};

export default ItemCard;

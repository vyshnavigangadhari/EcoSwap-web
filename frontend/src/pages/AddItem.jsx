import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import itemService from "../services/itemService";

const AddItem = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [coins, setCoins] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to add an item.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("coins", coins);
      if (image) formData.append("image", image);

      await itemService.addItem(formData, user.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Item</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="SwapCoins value"
          value={coins}
          onChange={(e) => setCoins(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;

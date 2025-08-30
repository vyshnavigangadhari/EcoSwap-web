// src/pages/AddItem.jsx
import { useState } from "react";
import { useItems } from "../context/ItemsContext";

export default function AddItem() {
  const { addItem } = useItems();
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    owner: ""
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.owner.trim()) {
      alert("Title and Owner are required");
      return;
    }
    await addItem(form);
    setForm({ title: "", description: "", imageUrl: "", owner: "" });
    alert("Item added successfully!");
  };

  return (
    <div className="container">
      <h1>Add Item</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Title *
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="input"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="input"
            rows={3}
          />
        </label>

        <label>
          Image URL (optional)
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={onChange}
            className="input"
          />
        </label>

        <label>
          Owner *
          <input
            name="owner"
            value={form.owner}
            onChange={onChange}
            className="input"
            required
          />
        </label>

        <button type="submit" className="btn">
          Add Item
        </button>
      </form>
    </div>
  );
}

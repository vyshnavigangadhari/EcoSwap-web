import { useState } from "react";

export default function AddItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    owner: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      _id: Date.now().toString(),
      title: form.title,
      description: form.description || "No description provided",
      imageUrl: form.imageUrl,
      owner: form.owner || "Unknown",
      status: "AVAILABLE",
      createdAt: new Date().toISOString(),
    };

    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const updatedItems = [...storedItems, newItem];
    localStorage.setItem("items", JSON.stringify(updatedItems));

    alert("Item added successfully!");
    setForm({ title: "", description: "", imageUrl: "", owner: "" });
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="brand">Add New Item</h1>
        <form className="form" onSubmit={handleSubmit}>
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
    </div>
  );
}

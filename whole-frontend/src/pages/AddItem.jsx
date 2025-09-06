import { useState } from "react";

export default function AddItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "", // store base64 instead of URL
    owner: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload -> convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      _id: Date.now().toString(),
      title: form.title,
      description: form.description || "No description provided",
      image: form.image, // ✅ stored as base64
      owner: form.owner || "Unknown",
      status: "AVAILABLE",
      createdAt: new Date().toISOString(),
    };

    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const updatedItems = [...storedItems, newItem];
    localStorage.setItem("items", JSON.stringify(updatedItems));

    alert("Item added successfully!");
    setForm({ title: "", description: "", image: "", owner: "" });
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
            Upload Image *
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input"
              required
            />
          </label>

          {/* Show preview if an image is selected */}
          {form.image && (
            <div className="preview">
              <p>Preview:</p>
              <img
                src={form.image}
                alt="Preview"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            </div>
          )}

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

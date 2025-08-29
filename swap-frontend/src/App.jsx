import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemDetail";

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="brand">EcoSwap</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/add">Add Item</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </div>
  );
}

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import AddItem from './pages/AddItem.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import { ItemsProvider } from './context/ItemsContext.jsx'
import { ToastProvider } from './components/Toast.jsx'


export default function App(){
return (
<ToastProvider>
<ItemsProvider>
<div className="app">
<Navbar />
<main className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/items/:id" element={<ItemDetails />} />
<Route path="/add" element={<AddItem />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<Profile />} />
<Route path="/about" element={<About />} />
<Route path="*" element={<NotFound />} />
</Routes>
</main>
<Footer />
</div>
</ItemsProvider>
</ToastProvider>
)
}
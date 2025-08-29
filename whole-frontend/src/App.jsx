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

import { useEffect,useState } from 'react'

export default function App(){
    const [ping, setPing] = useState('');
    useEffect(() => {
        fetch('http://localhost:5000/api/items')  // Adjust the URL as needed
            .then(response => response.json())
            .then(data => setPing(data.message))
            .catch(error => console.error('Error fetching ping:', error));
    }, []);

    console.log(ping);  // Should log 'pong' if the backend is working correctly    
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
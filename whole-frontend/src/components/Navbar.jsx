import { NavLink, Link } from 'react-router-dom'


export default function Navbar(){
return (
<header className="nav">
<Link to="/" className="brand">EcoSwap</Link>
<nav>
<NavLink to="/" end>Home</NavLink>
<NavLink to="/dashboard">Dashboard</NavLink>
<NavLink to="/add">Add Item</NavLink>
<NavLink to="/profile">Profile</NavLink>
<NavLink to="/about">About</NavLink>
</nav>
</header>
)
}
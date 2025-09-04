// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import AddItem from "./pages/AddItem.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import { ItemsProvider } from "./context/ItemsContext.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import { useContext } from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SwapRequests from "./pages/SwapRequests.jsx";
import MyRequests from "./pages/MyRequests.jsx"; // ✅ new page

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <ToastProvider>
      <ItemsProvider>
        <AuthProvider>
          <div className="app">
            <Navbar />
            <main className="container">
              <Routes>
                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/items/:id" element={<ItemDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />

                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <AddItem />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                {/* Swap system */}
                <Route
                  path="/swap-requests"
                  element={<SwapRequests />} // 🔓 Public for now
                />
                <Route
                  path="/my-requests"
                  element={<MyRequests />} // 🔓 Public for now
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ItemsProvider>
    </ToastProvider>
  );
}

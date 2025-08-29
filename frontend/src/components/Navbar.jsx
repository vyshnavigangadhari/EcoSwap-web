import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./Notification";
import swapService from "../services/swapService";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch pending swaps count
  useEffect(() => {
    const fetchPending = async () => {
      if (user) {
        try {
          const swaps = await swapService.getPendingSwaps(user._id);
          setPendingCount(swaps.length);
        } catch (err) {
          console.error("Error fetching pending swaps:", err);
        }
      }
    };
    fetchPending();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 p-4 text-white flex justify-between items-center">
      <div>
        <Link to="/" className="mr-4 font-bold text-lg">
          EcoSwap ♻️
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <span>Coins: {user.swapCoins}</span>

            {/* Notifications */}
            <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
              🔔
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {pendingCount}
                </span>
              )}
              {showNotifications && <Notification onClose={() => setShowNotifications(false)} />}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 rounded hover:bg-green-700">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

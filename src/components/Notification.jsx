import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import swapService from "../services/swapService";

const Notification = ({ onClose }) => {
  const { user, updateCoins } = useContext(AuthContext);
  const [pendingSwaps, setPendingSwaps] = useState([]);

  // Fetch pending swaps on mount
  useEffect(() => {
    const fetchPending = async () => {
      if (user) {
        try {
          const swaps = await swapService.getPendingSwaps(user._id);
          setPendingSwaps(swaps);
        } catch (err) {
          console.error("Error fetching pending swaps:", err);
        }
      }
    };
    fetchPending();
  }, [user]);

  // Approve a swap
  const handleApprove = async (swapId, coinsEarned) => {
    try {
      await swapService.approveSwap(swapId);
      // Update user coins in AuthContext
      updateCoins(user.swapCoins + coinsEarned);
      // Remove swap from pending list
      setPendingSwaps(pendingSwaps.filter((swap) => swap._id !== swapId));
    } catch (err) {
      console.error("Error approving swap:", err);
    }
  };

  // Decline a swap
  const handleDecline = async (swapId) => {
    try {
      await swapService.declineSwap(swapId);
      // Remove swap from pending list
      setPendingSwaps(pendingSwaps.filter((swap) => swap._id !== swapId));
    } catch (err) {
      console.error("Error declining swap:", err);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white text-black border rounded shadow-lg z-50 p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Pending Swaps</h3>
        <button onClick={onClose} className="text-red-500 font-bold">X</button>
      </div>

      {pendingSwaps.length === 0 ? (
        <p className="text-sm text-gray-500">No pending swaps</p>
      ) : (
        pendingSwaps.map((swap) => (
          <div key={swap._id} className="border-b py-2">
            <p>
              <strong>{swap.requesterName}</strong> wants to swap <strong>{swap.itemName}</strong>
            </p>
            <div className="flex space-x-2 mt-1">
              <button
                onClick={() => handleApprove(swap._id, swap.coins)}
                className="bg-green-500 px-2 py-1 text-white rounded hover:bg-green-700 text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleDecline(swap._id)}
                className="bg-red-500 px-2 py-1 text-white rounded hover:bg-red-700 text-sm"
              >
                Decline
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;

// client/src/pages/Favourites.jsx
import React, { useEffect, useState } from "react";
import { fetchFavourites, addFavourite, removeFavourite } from "../api"; // ✅ Ensure these exist in api.js

const Favourites = ({ userId }) => {
  const [favourites, setFavourites] = useState([]);
  const [newFav, setNewFav] = useState("");

  // Fetch all favourites when page loads
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const data = await fetchFavourites(userId);
        setFavourites(data);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };
    getFavourites();
  }, [userId]);

  // Add new favourite
  const handleAdd = async () => {
    if (!newFav) {
      alert("Enter a topic to add!");
      return;
    }

    try {
      const fav = await addFavourite(userId, newFav);
      setFavourites((prev) => [...prev, fav]);
      setNewFav("");
    } catch (err) {
      console.error("Error adding favourite:", err);
    }
  };

  // Remove favourite
  const handleRemove = async (favId) => {
    try {
      await removeFavourite(favId);
      setFavourites((prev) => prev.filter((f) => f._id !== favId));
    } catch (err) {
      console.error("Error removing favourite:", err);
    }
  };

  return (
    <div className="favourites-container" style={{ padding: "20px" }}>
      <h2>Favourites</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Add a new favourite topic"
          value={newFav}
          onChange={(e) => setNewFav(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAdd}>Add Favourite</button>
      </div>

      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <ul>
          {favourites.map((fav) => (
            <li key={fav._id}>
              {fav.topic}
              <button
                onClick={() => handleRemove(fav._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;

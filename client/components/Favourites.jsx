import { useState, useEffect } from "react";
import { saveFavorite } from "./api";

export default function Favourites({ userId }) {
  const [topic, setTopic] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleSaveFavorite = async () => {
    if (!topic) return;
    const res = await saveFavorite(userId, topic);
    if (!res.error) {
      setFavorites(prev => [...prev, topic]);
      setTopic("");
      alert("Topic saved to favorites!");
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      <input 
        type="text" 
        placeholder="Enter topic" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={handleSaveFavorite}>Add to Favorites</button>

      <ul>
        {favorites.map((fav, i) => <li key={i}>{fav}</li>)}
      </ul>
    </div>
  );
}

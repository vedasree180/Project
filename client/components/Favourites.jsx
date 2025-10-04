import { useState } from 'react';
import { saveFavorite } from '../api';

export default function Favorites({ userId }) {
  const [topic, setTopic] = useState('');
  const [msg, setMsg] = useState('');

  const addFavorite = async () => {
    const res = await saveFavorite(userId, topic);
    setMsg(res.message || res.error);
    setTopic('');
  };

  return (
    <div>
      <h2>Favorites</h2>
      <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic" />
      <button onClick={addFavorite}>Add Favorite</button>
      <p>{msg}</p>
    </div>
  );
}

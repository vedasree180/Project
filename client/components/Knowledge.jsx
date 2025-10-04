import { useState } from 'react';
import { fetchKnowledge } from '../api';

export default function Knowledge() {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetchKnowledge(topic);
    setSummary(res.summary || res.error);
    setLoading(false);
  };

  return (
    <div>
      <h2>Knowledge Engine</h2>
      <input placeholder="Enter topic" value={topic} onChange={e => setTopic(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {loading ? <p>Loading...</p> : <p>{summary}</p>}
    </div>
  );
}

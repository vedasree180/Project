import { useState } from "react";
import { fetchKnowledge } from "./api";

export default function Knowledge() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState(null);

  const handleFetchKnowledge = async () => {
    if (!topic) return;
    const res = await fetchKnowledge(topic);
    if (!res.error) {
      setData(res);
    }
  };

  return (
    <div>
      <h2>Knowledge Center</h2>
      <input 
        type="text" 
        placeholder="Enter topic" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={handleFetchKnowledge}>Fetch Knowledge</button>

      {data && (
        <div className="knowledge-result">
          <h3>{topic}</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { fetchKnowledge, saveActivity } from "./api";

export default function Activity({ userId }) {
  const [activities, setActivities] = useState([]);
  const [topic, setTopic] = useState("");

  const handleSaveActivity = async () => {
    if (!topic) return;
    const res = await saveActivity(userId, topic, `Viewed knowledge on ${topic}`);
    if (!res.error) {
      alert("Activity saved!");
      setActivities(prev => [...prev, { name: topic, description: `Viewed knowledge on ${topic}` }]);
      setTopic("");
    }
  };

  return (
    <div>
      <h2>User Activities</h2>
      <input 
        type="text" 
        placeholder="Enter topic" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={handleSaveActivity}>Save Activity</button>

      <ul>
        {activities.map((act, i) => (
          <li key={i}>
            <b>{act.name}</b> - {act.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

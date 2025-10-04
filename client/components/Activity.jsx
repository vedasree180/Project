// client/src/pages/Activity.jsx
import React, { useEffect, useState } from "react";
import { saveActivity, fetchActivities } from "../api"; // ✅ Make sure api.js has these functions

const Activity = ({ userId }) => {
  const [activities, setActivities] = useState([]);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  // Fetch user activities from backend when component loads
  useEffect(() => {
    const getActivities = async () => {
      try {
        const data = await fetchActivities(userId);
        setActivities(data);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    getActivities();
  }, [userId]);

  // Handle adding new activity
  const handleSave = async () => {
    if (!topic || !description) {
      alert("Please enter both topic and description!");
      return;
    }

    try {
      const newActivity = await saveActivity(userId, topic, description);
      setActivities((prev) => [...prev, newActivity]);
      setTopic("");
      setDescription("");
    } catch (err) {
      console.error("Error saving activity:", err);
      alert("Error saving activity.");
    }
  };

  return (
    <div className="activity-container" style={{ padding: "20px" }}>
      <h2>User Activity</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSave}>Save Activity</button>
      </div>

      <ul>
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          activities.map((act, i) => (
            <li key={i}>
              <strong>{act.name}</strong>: {act.description}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Activity;

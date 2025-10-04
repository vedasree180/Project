import { useState } from "react";

function Activity() {
  const [activity, setActivity] = useState({ name: "", description: "" });
  const [feedback, setFeedback] = useState("");

  const handleSave = async () => {
    // 🧩 1️⃣ Validate inputs
    if (!activity.name.trim() || !activity.description.trim()) {
      setFeedback("⚠️ Please fill in all fields before saving.");
      return;
    }

    try {
      // 🧩 2️⃣ Send POST request to backend
      const response = await fetch("http://localhost:4000/api/user/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });

      // 🧩 3️⃣ Handle server response safely
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save activity");
      }

      const data = await response.json();

      // 🧩 4️⃣ Give feedback to user
      setFeedback("✅ Activity saved successfully!");
      console.log("Server response:", data);

      // 🧩 5️⃣ Clear input fields
      setActivity({ name: "", description: "" });
    } catch (err) {
      console.error("Error:", err);
      setFeedback(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Log New Activity</h2>

      <input
        type="text"
        placeholder="Activity Name"
        value={activity.name}
        onChange={(e) => setActivity({ ...activity, name: e.target.value })}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        placeholder="Activity Description"
        value={activity.description}
        onChange={(e) =>
          setActivity({ ...activity, description: e.target.value })
        }
        style={{
          display: "block",
          width: "100%",
          height: "120px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={handleSave}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Save Activity
      </button>

      <p style={{ marginTop: "15px", fontWeight: "bold" }}>{feedback}</p>
    </div>
  );
}

export default Activity;

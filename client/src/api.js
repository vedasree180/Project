// 📁 client/src/pages/api.js

// ✅ Base URL (change this when you deploy)
const API_BASE = 'http://localhost:4000';

/**
 * 🔐 Signup User
 * @param {Object} data - { name, email, password }
 */
export async function signupUser(data) {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Signup failed');
    return await res.json();
  } catch (err) {
    console.error('❌ Signup Error:', err);
    return { error: err.message };
  }
}

/**
 * 🔑 Login User
 * @param {Object} data - { email, password }
 */
export async function loginUser(data) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  } catch (err) {
    console.error('❌ Login Error:', err);
    return { error: err.message };
  }
}

/**
 * 📚 Fetch Knowledge Data
 * @param {String} topic - selected topic
 */
export async function fetchKnowledge(topic) {
  try {
    const res = await fetch(`${API_BASE}/knowledge?topic=${encodeURIComponent(topic)}`);
    if (!res.ok) throw new Error('Failed to fetch knowledge');
    return await res.json();
  } catch (err) {
    console.error('❌ Knowledge Fetch Error:', err);
    return { error: err.message };
  }
}

/**
 * 🧠 Fetch Quiz Data
 * @param {String} topic 
 * @param {String} userId
 */
export async function fetchQuiz(topic, userId) {
  try {
    const res = await fetch(`${API_BASE}/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, userId })
    });
    if (!res.ok) throw new Error('Failed to fetch quiz');
    return await res.json();
  } catch (err) {
    console.error('❌ Quiz Fetch Error:', err);
    return { error: err.message };
  }
}

/**
 * ⭐ Save Favorite Topic
 * @param {String} userId 
 * @param {String} topic 
 */
export async function saveFavorite(userId, topic) {
  try {
    const res = await fetch(`${API_BASE}/user/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, topic })
    });
    if (!res.ok) throw new Error('Failed to save favorite');
    return await res.json();
  } catch (err) {
    console.error('❌ Favorite Save Error:', err);
    return { error: err.message };
  }
}

/**
 * 🧩 Save User Activity
 * @param {String} userId 
 * @param {String} name - Activity name
 * @param {String} description - Activity description
 */
export async function saveActivity(userId, name, description) {
  try {
    const res = await fetch(`${API_BASE}/user/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, name, description })
    });
    if (!res.ok) throw new Error('Failed to save activity');
    return await res.json();
  } catch (err) {
    console.error('❌ Activity Save Error:', err);
    return { error: err.message };
  }
}

// client/src/components/SearchBar.jsx
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Search nodes, e.g., 'Plant Biology'"
        value={q}
        onChange={e => setQ(e.target.value)}
        style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
      />
      <div style={{ marginTop: 8 }}>
        <button type="submit" style={{ marginRight: 8 }}>Search</button>
        <button type="button" onClick={() => { setQ(''); onSearch(''); }}>Reset</button>
      </div>
    </form>
  );
}

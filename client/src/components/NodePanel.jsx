// client/src/components/NodePanel.jsx
import React from 'react';

export default function NodePanel({ data, details }) {
  if (!data) return null;
  return (
    <div style={{ fontSize: 13 }}>
      <div style={{ fontWeight: 700 }}>{data.label || data.id}</div>
      <div style={{ color: '#666', marginBottom: 6 }}>{data.group}</div>
      <div style={{ marginBottom: 8 }}>{data.description}</div>

      {details && details.neighbors && details.neighbors.length > 0 && (
        <>
          <div style={{ fontWeight: 600, marginTop: 8 }}>Neighbors</div>
          <ul style={{ paddingLeft: 18 }}>
            {details.neighbors.map(n => <li key={n.id}>{n.label || n.id} <span style={{ color:'#666' }}>({n.group})</span></li>)}
          </ul>
        </>
      )}
    </div>
  );
}

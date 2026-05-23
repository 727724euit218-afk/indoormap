import React from 'react';
import { useNavigate } from 'react-router-dom';

function DestinationReachedPage() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--wf-green-600)', fontSize: '2.5rem', marginBottom: '1rem' }}>Destination Reached!</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--wf-gray-500)', marginBottom: '2rem' }}>You have successfully arrived at your destination.</p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={() => navigate('/')}>Navigate Again</button>
        <button className="btn-secondary">Save Location</button>
      </div>
    </div>
  );
}

export default DestinationReachedPage;

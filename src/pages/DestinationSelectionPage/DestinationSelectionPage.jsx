import React from 'react';
import { useNavigate } from 'react-router-dom';

function DestinationSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Destination Selection Page</h1>
      <p>Select destination via search, category filter, etc.</p>
      <button className="btn-primary" onClick={() => navigate('/preview')}>Go to Destination</button>
    </div>
  );
}

export default DestinationSelectionPage;

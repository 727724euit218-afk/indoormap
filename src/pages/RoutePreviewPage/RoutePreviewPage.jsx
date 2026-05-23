import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoutePreviewPage() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Route Preview Page</h1>
      <p>Full route summary before navigation begins.</p>
      <button className="btn-primary" onClick={() => navigate('/navigate')}>Start Navigation</button>
    </div>
  );
}

export default RoutePreviewPage;

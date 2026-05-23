import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationConfirmationPopup from '../../components/popups/NavigationConfirmationPopup';

function LiveNavigationPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Live Navigation Page</h1>
      <p>Real-time step-by-step guidance.</p>
      
      <button className="btn-secondary" onClick={() => setShowPopup(true)} style={{ marginRight: '1rem' }}>
        Simulate Checkpoint
      </button>

      <button className="btn-primary" onClick={() => navigate('/reached')}>Finish Navigation</button>

      {showPopup && (
        <NavigationConfirmationPopup 
          onConfirm={() => setShowPopup(false)} 
          onRecalculate={() => setShowPopup(false)} 
        />
      )}
    </div>
  );
}

export default LiveNavigationPage;

import React from 'react';

function NavigationConfirmationPopup({ onConfirm, onRecalculate }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
    }}>
      <div className="glass-card" style={{ padding: '2rem', maxWidth: '400px', width: '90%', textAlign: 'center', background: 'var(--wf-bg)' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 700 }}>Did you take the stairs to Floor 2?</h3>
        <p style={{ marginBottom: '2rem', color: 'var(--wf-gray-500)' }}>Confirm to continue accurate indoor routing.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={onConfirm}>Yes, I did</button>
          <button className="btn-secondary" onClick={onRecalculate} style={{ borderColor: 'red', color: 'red' }}>No, recalculate</button>
        </div>
      </div>
    </div>
  );
}

export default NavigationConfirmationPopup;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ArrowLeft, Layers, MapPin, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import './InternalMapsPage.css';

// Floor names mapping for cleaner display
const FLOOR_NAMES = {
  1: '1st Floor',
  2: '2nd Floor',
  3: '3rd Floor',
  4: '4th Floor',
  5: '5th Floor'
};

export default function InternalMapsPage() {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  
  // Default to IT Tower if buildingId is missing or invalid
  const bId = buildingId ? parseInt(buildingId, 10) : 3;
  
  const [floors, setFloors] = useState([]);
  const [activeFloor, setActiveFloor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isDark, setIsDark] = useState(() => localStorage.getItem('wayfinder-theme') === 'dark');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/maps/building/${bId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.success && json.data.length > 0) {
          const mappedFloors = json.data.map((map) => ({
            id: map.id,
            name: FLOOR_NAMES[map.floor_number] || map.name,
            imgPath: map.image_url,
            description: map.description
          }));
          setFloors(mappedFloors);
          setActiveFloor(mappedFloors[0]);
        } else {
          throw new Error('No indoor maps found in database for this building');
        }
      })
      .catch((err) => {
        console.warn('[WayFinder] Backend offline – using local hardcoded floor maps:', err.message);
        // Fallback to local hardcoded floor list
        const localFloors = [
          { id: 'f1', name: '1st Floor', imgPath: '/maps/kgisl_floor1.jpg' },
          { id: 'f2', name: '2nd Floor', imgPath: '/maps/kgisl_floor2.jpg' },
          { id: 'f3', name: '3rd Floor', imgPath: '/maps/kgisl_floor3.jpg' },
          { id: 'f4', name: '4th Floor', imgPath: '/maps/kgisl_floor4.jpg' },
          { id: 'f5', name: '5th Floor', imgPath: '/maps/kgisl_floor5.jpg' },
        ];
        setFloors(localFloors);
        setActiveFloor(localFloors[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bId]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFloorSelect = (floor) => {
    setActiveFloor(floor);
    setImgError(false); // Reset error state on floor change
  };

  // If loading
  if (loading) {
    return (
      <div className="imp-container" data-theme={isDark ? 'dark' : 'light'}>
        <div className="imp-header">
          <button className="imp-back-btn" onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="imp-title-group">
            <h2>Loading Maps...</h2>
          </div>
        </div>
        <div className="imp-no-data">
          <div className="imp-spinner" />
          <p>Fetching indoor maps from database...</p>
        </div>
      </div>
    );
  }

  // If no maps are found
  if (floors.length === 0 || !activeFloor) {
    return (
      <div className="imp-container" data-theme={isDark ? 'dark' : 'light'}>
        <div className="imp-header">
          <button className="imp-back-btn" onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="imp-title-group">
            <h2>Indoor Maps</h2>
            <span>No maps available</span>
          </div>
        </div>
        <div className="imp-no-data">
          <MapPin size={48} opacity={0.2} />
          <p>Indoor navigation is not available for this building yet.</p>
          <button className="imp-primary-btn" onClick={() => navigate('/')}>Return to Campus Map</button>
        </div>
      </div>
    );
  }

  const buildingName = bId === 3 ? 'KGiSL Building' : 'IT Tower';

  return (
    <div className="imp-container" data-theme={isDark ? 'dark' : 'light'}>
      {/* ── Header ── */}
      <header className="imp-header">
        <button className="imp-back-btn" onClick={handleGoBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="imp-title-group">
          <h2>{buildingName}</h2>
          <span>Indoor Navigation</span>
        </div>
      </header>

      <div className="imp-content">
        {/* ── Sidebar: Floor Selector ── */}
        <aside className="imp-sidebar">
          <div className="imp-sidebar-header">
            <Layers size={18} />
            <h3>Select Floor</h3>
          </div>
          <div className="imp-floor-list">
            {floors.map((floor) => (
              <button
                key={floor.id}
                className={`imp-floor-btn ${activeFloor.id === floor.id ? 'active' : ''}`}
                onClick={() => handleFloorSelect(floor)}
              >
                {floor.name}
              </button>
            ))}
          </div>
        </aside>

        {/* ── Main Map Viewer ── */}
        <main className="imp-viewer">
          <div className="imp-viewer-inner">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="imp-controls">
                    <button onClick={() => zoomIn()}><ZoomIn size={18} /></button>
                    <button onClick={() => zoomOut()}><ZoomOut size={18} /></button>
                    <button onClick={() => resetTransform()}><Maximize size={18} /></button>
                  </div>
                  
                  <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                    {imgError ? (
                      <div className="imp-placeholder">
                        <MapPin size={40} opacity={0.5} />
                        <p>Map image not found</p>
                        <span style={{fontSize:'12px', opacity: 0.7}}>Please ensure `{activeFloor.imgPath}` exists in the public directory.</span>
                      </div>
                    ) : (
                      <motion.img
                        key={activeFloor.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        src={activeFloor.imgPath}
                        alt={`${buildingName} ${activeFloor.name}`}
                        className="imp-map-image"
                        onError={() => setImgError(true)}
                        draggable={false}
                      />
                    )}
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
          
          <div className="imp-floor-indicator">
            Currently Viewing: <strong>{activeFloor.name}</strong>
          </div>
        </main>
      </div>
    </div>
  );
}

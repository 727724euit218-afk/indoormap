import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const MapContext = createContext(null);

export function MapProvider({ children }) {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ideally map ID should be dynamic, but for now we fetch the first map
    fetch('http://localhost:5000/maps')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.length > 0) {
          const firstMapId = json.data[0].id;
          return fetch(`http://localhost:5000/maps/${firstMapId}/graph`);
        } else {
          throw new Error('No maps found');
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setMapData(json.data);
        } else {
          throw new Error(json.message);
        }
      })
      .catch(err => {
        console.error('Failed to fetch map data:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Compute graph and node info once data is loaded
  const graphData = useMemo(() => {
    if (!mapData) return null;
    const { landmarks, junctions, junctionEdges, landmarkAccess } = mapData.graph;
    
    const NODE_INFO = {};
    for (const lm of landmarks)  NODE_INFO[String(lm.id)] = { position: lm.position, name: lm.name, isLandmark: true, category: lm.category  };
    for (const jn of junctions)  NODE_INFO[jn.id]         = { position: jn.position, name: jn.id,   isLandmark: false };

    const GRAPH = {};
    for (const id in NODE_INFO) GRAPH[id] = {};

    for (const e of junctionEdges) {
      GRAPH[e.from][e.to] = e.distance;
      GRAPH[e.to][e.from] = e.distance;
    }
    
    for (const a of landmarkAccess) {
      const lKey = String(a.landmark);
      const jKey = a.junction;
      if (GRAPH[lKey] !== undefined && GRAPH[jKey] !== undefined) {
        GRAPH[lKey][jKey] = a.distance;
        GRAPH[jKey][lKey] = a.distance;
      }
    }

    return { NODE_INFO, GRAPH, landmarks, junctions, junctionEdges, landmarkAccess, mapInfo: mapData.map };
  }, [mapData]);

  const value = {
    loading,
    error,
    ...graphData
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (context === null) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
}

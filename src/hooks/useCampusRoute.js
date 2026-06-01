import { useMemo, useCallback } from 'react';
import { useMapContext } from '../context/MapContext';

export function useCampusRouting() {
  const { NODE_INFO, GRAPH } = useMapContext();

  const findShortestPath = useCallback((startId, endId) => {
    if (!NODE_INFO || !GRAPH) return [];
    
    const sKey = String(startId);
    const eKey = String(endId);

    const dist     = {};
    const previous = {};
    const unvisited = new Set(Object.keys(NODE_INFO));

    for (const id of unvisited) dist[id] = Infinity;
    dist[sKey] = 0;

    while (unvisited.size > 0) {
      let curr = null, minD = Infinity;
      for (const id of unvisited) {
        if (dist[id] < minD) { minD = dist[id]; curr = id; }
      }
      if (curr === null || curr === eKey) break;
      unvisited.delete(curr);

      for (const nb in (GRAPH[curr] || {})) {
        if (!unvisited.has(nb)) continue;
        const alt = dist[curr] + GRAPH[curr][nb];
        if (alt < dist[nb]) { dist[nb] = alt; previous[nb] = curr; }
      }
    }

    const path = [];
    let u = eKey;
    while (u !== undefined) { path.unshift(u); u = previous[u]; }
    return path.length > 1 || path[0] === sKey ? path : [];
  }, [NODE_INFO, GRAPH]);

  const getNodePosition = useCallback((id) => {
    if (!NODE_INFO) return null;
    return NODE_INFO[String(id)]?.position ?? null;
  }, [NODE_INFO]);

  const getNamedRouteSteps = useCallback((sourceId, destId) => {
    if (!NODE_INFO || !GRAPH) return null;
    
    const path = findShortestPath(sourceId, destId);
    if (!path || path.length < 2) return null;

    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += (GRAPH[path[i]] || {})[path[i + 1]] || 0;
    }

    const lmIds = path.filter(id => !id.startsWith('J_'));

    const steps = [];
    for (let i = 0; i < lmIds.length - 1; i++) {
      const fromKey = lmIds[i];
      const toKey   = lmIds[i + 1];
      const fi = path.indexOf(fromKey);
      const ti = path.indexOf(toKey);
      let segDist = 0;
      for (let k = fi; k < ti; k++) {
        segDist += (GRAPH[path[k]] || {})[path[k + 1]] || 0;
      }
      steps.push({
        from:     NODE_INFO[fromKey]?.name || fromKey,
        to:       NODE_INFO[toKey]?.name   || toKey,
        distance: Math.round(segDist),
      });
    }

    return { steps, totalDistance: Math.round(totalDistance), path };
  }, [NODE_INFO, GRAPH, findShortestPath]);

  return {
    findShortestPath,
    getNodePosition,
    getNamedRouteSteps
  };
}

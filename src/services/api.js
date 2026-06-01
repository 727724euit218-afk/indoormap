// ============================================================
// src/services/api.js — Campus WayFinder API Service Layer
//
// All backend requests go through this file.
// The Vite proxy maps /api  →  http://localhost:5000
// so there are no CORS issues in development.
//
// Every function falls back to the local campusData.js when
// the backend is offline, so the app always works.
// ============================================================

import { landmarks } from '../components/CampusMap/campusData';

const BASE = '/api';

// ── Category name → campusData category key mapping ──────────
const CATEGORY_MAP = {
  'Academic':   'academic',
  'Hostel':     'hostel',
  'Facility':   'facility',
  'Admin':      'admin',
  'Medical':    'medical',
  'Entry':      'entry',
  'academic':   'academic',
  'hostel':     'hostel',
  'facility':   'facility',
  'admin':      'admin',
  'medical':    'medical',
  'entry':      'entry',
};

// ── Shape returned by fetchLocations ─────────────────────────
// { id, name, description, category, floor_number, building_name, x_coordinate, y_coordinate }
// This matches the landmark shape used throughout the app.

function normalizePgLocation(row) {
  return {
    id:           row.id,
    name:         row.name,
    description:  row.description || row.building_name || 'KGiSL Campus',
    category:     CATEGORY_MAP[row.category_name] || 'facility',
    floor_number: row.floor_number ?? 0,
    building_name: row.building_name || '',
    x_coordinate: row.x_coordinate,
    y_coordinate: row.y_coordinate,
  };
}

// ── GET /api/locations ────────────────────────────────────────
// Returns an array of location objects.
// Falls back to campusData landmarks if the API is unreachable.
export async function fetchLocations() {
  try {
    const res = await fetch(`${BASE}/locations`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('Empty response');
    return { data: data.map(normalizePgLocation), source: 'api' };
  } catch (err) {
    console.warn('[WayFinder] Backend offline – using local campusData.js:', err.message);
    return { data: landmarks, source: 'local' };
  }
}

// ── GET /api/buildings ────────────────────────────────────────
export async function fetchBuildings() {
  try {
    const res = await fetch(`${BASE}/buildings`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return [];
  }
}

// ── GET /api/categories ───────────────────────────────────────
export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE}/categories`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return [];
  }
}

// ── GET /api/dashboard/stats ──────────────────────────────────
export async function fetchDashboardStats() {
  try {
    const res = await fetch(`${BASE}/dashboard/stats`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

// ── Health check — resolves true if backend is reachable ──────
export async function isBackendOnline() {
  try {
    const res = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

// KGISL Campus Data — Road network traced from actual campus map image
// Blue lines = roads, Red dots = building entrances
// viewBox "0 0 855 1079"

export const landmarks = [
  { id: 1,  name: 'Main Entrance Gate',        position: [467, 937], category: 'entry',    description: 'Primary entry/exit point' },
  { id: 3,  name: 'KGISL',                     position: [468, 825], category: 'academic', description: 'Main KGISL institution building' },
  { id: 4,  name: 'KGISL Parking 2',           position: [373, 475], category: 'facility', description: 'Parking zone – upper west' },
  { id: 5,  name: 'Kite Academic Block & Lab', position: [368, 552], category: 'academic', description: 'Academic classrooms and labs' },
  { id: 6,  name: 'IT Tower',                  position: [379, 656], category: 'academic', description: 'IT department tower building' },
  { id: 7,  name: 'Kite Cafeteria',            position: [560, 628], category: 'facility', description: 'Student cafeteria' },
  { id: 8,  name: 'Kite Gym & Volley Ball',    position: [561, 554], category: 'facility', description: 'Gymnasium and volleyball courts' },
  { id: 10, name: 'GSS',                       position: [613, 536], category: 'facility', description: 'General support services' },
  { id: 11, name: 'Health Science',            position: [634, 295], category: 'medical',  description: 'Health sciences department' },
  { id: 12, name: 'Nursing College',           position: [705, 612], category: 'academic', description: 'Nursing college building' },
  { id: 13, name: 'Nursing Hostel',            position: [551, 290], category: 'hostel',   description: 'Hostel for nursing students' },
  { id: 14, name: 'Boys Hostel (NMH)',         position: [366, 375], category: 'hostel',   description: 'Boys hostel – NMH block' },
  { id: 15, name: 'Open Auditorium',           position: [219, 460], category: 'facility', description: 'Open-air auditorium' },
  { id: 16, name: 'Facilities Building',       position: [570, 477], category: 'facility', description: 'Central facilities building' },
  { id: 18, name: 'Pump Room',                 position: [603, 646], category: 'facility', description: 'Water pump station' },
  { id: 19, name: 'STP Area',                  position: [227, 241], category: 'facility', description: 'Sewage treatment plant' },
  { id: 20, name: 'Canteen Block',             position: [437, 181], category: 'facility', description: 'Top campus canteen' },
  { id: 21, name: 'Parking Shed',              position: [276, 117], category: 'facility', description: 'Covered parking shed (upper)' },
  { id: 22, name: 'Ground',                    position: [337, 248], category: 'facility', description: 'Sports ground' },
  { id: 27, name: 'Transformer',               position: [556, 804], category: 'facility', description: 'Electrical transformer' },
  { id: 28, name: 'Guest House',               position: [352, 777], category: 'facility', description: 'Guest accommodation' },
  { id: 29, name: 'Ladies Hostel',             position: [339, 813], category: 'hostel',   description: 'Ladies hostel block' },
  { id: 30, name: 'Dining Hall',               position: [336, 869], category: 'facility', description: 'Main student dining hall' },
  { id: 31, name: 'Kitchen',                   position: [378, 871], category: 'facility', description: 'Campus kitchen' },
  { id: 32, name: 'Main Drinking Water Tank',  position: [651, 759], category: 'facility', description: 'Primary campus water tank' },
  { id: 33, name: 'EB Room',                   position: [799, 636], category: 'facility', description: 'Electricity board room' },
  { id: 34, name: 'Space for KG Design',       position: [656, 840], category: 'facility', description: 'Reserved for KG design' },
  { id: 35, name: 'Central Junction',          position: [371, 724], category: 'facility', description: 'Central road junction' },
  { id: 36, name: 'Water Tank 2',              position: [781, 700], category: 'facility', description: 'Secondary water tank' },
  { id: 37, name: 'Entrance Gate 2',           position: [411, 957], category: 'entry',    description: 'Secondary entrance gate' },
  { id: 39, name: 'Ground 2',                  position: [229, 290], category: 'facility', description: 'Sports ground 2' },
];

// ─── Road Junction Nodes ──────────────────────────────────────────────────────
// Traced from the blue road lines on the campus map image.
// Named after the labeled junctions (A, C, D, H, R) where visible.
export const junctions = [
  // ── Main entrance road (south) ──────────────────────────
  { id: 'J_S1', position: [450, 905] }, // inside main gate
  { id: 'J_S2', position: [435, 855] }, // KGISL frontage road

  // ── Central junction zone ────────────────────────────────
  // Junction H (map label): where east road meets central
  { id: 'J_H',  position: [510, 730] },
  // Junction D (map label): IT Tower / Guest House level split
  { id: 'J_D',  position: [430, 700] },
  // West branch from D toward IT Tower
  { id: 'J_W1', position: [380, 700] },

  // ── Hostel / dining cluster (south-west) ─────────────────
  { id: 'J_HL', position: [355, 795] }, // hostel lane entrance
  { id: 'J_HL2',position: [340, 845] }, // dining / kitchen access

  // ── Transformer / east inner road (south-east) ───────────
  { id: 'J_E0', position: [525, 808] }, // road near Transformer

  // ── East perimeter road junctions ────────────────────────
  // (runs along right side of campus, north from transformer)
  { id: 'J_E1', position: [558, 732] }, // east road at H level
  { id: 'J_E2', position: [562, 660] }, // Cafeteria / Pump Room level
  { id: 'J_E3', position: [647, 615] }, // Nursing College approach
  { id: 'J_E4', position: [718, 617] }, // Nursing College access
  { id: 'J_E5', position: [802, 638] }, // EB Room access
  { id: 'J_E6', position: [798, 704] }, // Water Tank 2 access
  { id: 'J_E7', position: [660, 793] }, // Water Tank / KG Design
  // Junction C (map label): east road upper, connects to central
  { id: 'J_C',  position: [650, 398] },
  // Junction R (map label): near Health Science
  { id: 'J_R',  position: [700, 292] },

  // ── Central campus road (vertical, middle) ───────────────
  // Junction A (map label): main cross-junction, upper campus
  { id: 'J_A',  position: [455, 492] },
  { id: 'J_M1', position: [455, 580] }, // mid between D and A
  // East spur at Gym / Facilities level
  { id: 'J_GF', position: [565, 500] }, // Gym / Facilities junction

  // ── West academic road (north of Junction A) ─────────────
  { id: 'J_W2', position: [380, 492] }, // KGISL Parking road
  { id: 'J_W3', position: [380, 390] }, // Boys Hostel road
  { id: 'J_W4', position: [380, 285] }, // Ground / upper west

  // ── Upper campus ─────────────────────────────────────────
  { id: 'J_N1', position: [440, 195] }, // Canteen Block top road
  { id: 'J_N2', position: [230, 285] }, // STP / Ground 2 road
  { id: 'J_N3', position: [200, 460] }, // Open Auditorium road

  // ── North-east (Health Science / Nursing Hostel) ─────────
  { id: 'J_NE', position: [550, 295] }, // Nursing Hostel road
];

// ─── Road Edges (junction-to-junction, along actual roads) ───────────────────
export const junctionEdges = [
  // Main entrance spine
  { from: 'J_S1',  to: 'J_S2',  distance: 60  },
  { from: 'J_S2',  to: 'J_D',   distance: 155 },  // main road north to D
  { from: 'J_S2',  to: 'J_HL',  distance: 90  },  // branch to hostel cluster
  { from: 'J_S2',  to: 'J_E0',  distance: 120 },  // branch to transformer road

  // Junction D connections
  { from: 'J_D',   to: 'J_W1',  distance: 50  },  // D → IT Tower side
  { from: 'J_D',   to: 'J_M1',  distance: 90  },  // D → north central road
  { from: 'J_D',   to: 'J_H',   distance: 80  },  // D → Junction H

  // Junction H connections
  { from: 'J_H',   to: 'J_E1',  distance: 50  },  // H → east perimeter road
  { from: 'J_H',   to: 'J_E0',  distance: 90  },  // H → transformer area

  // Hostel / dining cluster
  { from: 'J_HL',  to: 'J_W1',  distance: 90  },  // hostel lane to IT Tower level
  { from: 'J_HL',  to: 'J_HL2', distance: 50  },
  { from: 'J_HL2', to: 'J_S1',  distance: 80  },  // back to gate road (loop)

  // Transformer road to east perimeter
  { from: 'J_E0',  to: 'J_E1',  distance: 80  },
  { from: 'J_E0',  to: 'J_E7',  distance: 170 },  // loop south to water tank

  // East perimeter road (main loop, right side of campus)
  { from: 'J_E1',  to: 'J_E2',  distance: 72  },
  { from: 'J_E2',  to: 'J_E3',  distance: 85  },
  { from: 'J_E3',  to: 'J_E4',  distance: 71  },
  { from: 'J_E4',  to: 'J_E5',  distance: 84  },
  { from: 'J_E5',  to: 'J_E6',  distance: 66  },
  { from: 'J_E6',  to: 'J_E7',  distance: 145 },
  { from: 'J_E3',  to: 'J_C',   distance: 218 },  // east road continues north to C
  { from: 'J_C',   to: 'J_R',   distance: 107 },  // C to Health Science area
  { from: 'J_R',   to: 'J_NE',  distance: 155 },  // R to Nursing Hostel
  { from: 'J_R',   to: 'J_N1',  distance: 280 },  // R to canteen top road (upper cross)

  // Central road (vertical, from D northward)
  { from: 'J_M1',  to: 'J_A',   distance: 90  },
  { from: 'J_M1',  to: 'J_GF',  distance: 115 },  // mid to Gym/Facilities east spur
  { from: 'J_A',   to: 'J_GF',  distance: 115 },  // A to Gym/Facilities

  // Junction A – west and north branches
  { from: 'J_A',   to: 'J_W2',  distance: 80  },  // A → west parking road
  { from: 'J_A',   to: 'J_C',   distance: 210 },  // A → Junction C (cross road)

  // Gym / Facilities east spur connects to east road
  { from: 'J_GF',  to: 'J_E2',  distance: 120 },

  // West academic spine (north of A)
  { from: 'J_W2',  to: 'J_W3',  distance: 102 },
  { from: 'J_W3',  to: 'J_W4',  distance: 105 },
  { from: 'J_W4',  to: 'J_N2',  distance: 110 },  // Ground 2 / STP
  { from: 'J_W4',  to: 'J_N1',  distance: 90  },  // toward Canteen top

  // Auditorium spur (west of parking)
  { from: 'J_W2',  to: 'J_N3',  distance: 180 },

  // Upper campus
  { from: 'J_N1',  to: 'J_N2',  distance: 220 },  // canteen top ↔ STP
  { from: 'J_NE',  to: 'J_C',   distance: 305 },  // Nursing Hostel → C (via east road)
];

// ─── Landmark Access (short road from building entrance to nearest junction) ──
export const landmarkAccess = [
  { landmark: 1,  junction: 'J_S1',  distance: 35  }, // Main Gate
  { landmark: 37, junction: 'J_S1',  distance: 40  }, // Gate 2
  { landmark: 3,  junction: 'J_S2',  distance: 30  }, // KGISL
  { landmark: 27, junction: 'J_E0',  distance: 32  }, // Transformer
  { landmark: 28, junction: 'J_HL',  distance: 20  }, // Guest House
  { landmark: 29, junction: 'J_HL',  distance: 22  }, // Ladies Hostel
  { landmark: 30, junction: 'J_HL2', distance: 25  }, // Dining Hall
  { landmark: 31, junction: 'J_HL2', distance: 35  }, // Kitchen
  { landmark: 6,  junction: 'J_W1',  distance: 15  }, // IT Tower
  { landmark: 35, junction: 'J_W1',  distance: 30  }, // Central Junction node
  { landmark: 7,  junction: 'J_E2',  distance: 25  }, // Kite Cafeteria
  { landmark: 18, junction: 'J_E2',  distance: 42  }, // Pump Room
  { landmark: 8,  junction: 'J_GF',  distance: 12  }, // Gym
  { landmark: 10, junction: 'J_GF',  distance: 50  }, // GSS
  { landmark: 5,  junction: 'J_M1',  distance: 85  }, // Kite Academic (west of mid road)
  { landmark: 16, junction: 'J_GF',  distance: 20  }, // Facilities Building
  { landmark: 4,  junction: 'J_W2',  distance: 15  }, // KGISL Parking 2
  { landmark: 14, junction: 'J_W3',  distance: 18  }, // Boys Hostel
  { landmark: 15, junction: 'J_N3',  distance: 22  }, // Open Auditorium
  { landmark: 12, junction: 'J_E4',  distance: 18  }, // Nursing College
  { landmark: 33, junction: 'J_E5',  distance: 15  }, // EB Room
  { landmark: 36, junction: 'J_E6',  distance: 18  }, // Water Tank 2
  { landmark: 32, junction: 'J_E7',  distance: 20  }, // Main Water Tank
  { landmark: 34, junction: 'J_E7',  distance: 25  }, // KG Design
  { landmark: 11, junction: 'J_R',   distance: 65  }, // Health Science
  { landmark: 13, junction: 'J_NE',  distance: 25  }, // Nursing Hostel
  { landmark: 19, junction: 'J_N2',  distance: 45  }, // STP Area
  { landmark: 22, junction: 'J_W4',  distance: 55  }, // Ground
  { landmark: 39, junction: 'J_N2',  distance: 15  }, // Ground 2
  { landmark: 20, junction: 'J_N1',  distance: 15  }, // Canteen Block
  { landmark: 21, junction: 'J_N1',  distance: 185 }, // Parking Shed
];

// ─── Category Colours ─────────────────────────────────────────────────────────
export const categoryColors = {
  academic: '#1D3557',
  hostel:   '#457B9D',
  facility: '#F4A261',
  admin:    '#E63946',
  medical:  '#2A9D8F',
  entry:    '#264653',
};

// backward-compat stubs
export const roadNodes = [];
export const roadEdges = [];
export const landmarkEdges = [];

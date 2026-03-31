// URBA 1A — 2026 fixture calendar for San Andrés
// Libre = no match Saturday + extra Saturday training that week

export interface RugbyFixture {
  date: string      // 'YYYY-MM-DD' (Saturday)
  round: number | null
  home: string
  away: string
  isLibre: boolean
  isSemiOrFinal?: boolean
  specialTime?: string   // e.g. '14:00' when not 11:30
  note?: string
}

export const RUGBY_FIXTURES_2026: RugbyFixture[] = [
  // ─── Pretemporada ──────────────────────────────────────────
  { date: '2026-02-07', round: null, home: 'San Andrés', away: 'Pretemporada', isLibre: false, note: 'Pretemporada' },
  { date: '2026-02-14', round: null, home: 'San Andrés', away: 'Pretemporada', isLibre: false, note: 'Pretemporada' },
  { date: '2026-02-21', round: null, home: 'San Andrés', away: 'Pretemporada', isLibre: false, note: 'Pretemporada' },
  { date: '2026-02-28', round: null, home: 'San Andrés', away: 'Banco Nación', isLibre: false, note: 'Amistoso' },
  { date: '2026-03-07', round: null, home: 'Old Resian', away: 'San Andrés', isLibre: false, note: 'Amistoso — Gira Rosario 6-8 Mar' },

  // ─── URBA 1A ───────────────────────────────────────────────
  { date: '2026-03-14', round: 1, home: 'San Andrés', away: 'Pucará', isLibre: false },
  { date: '2026-03-21', round: 2, home: 'U de La Plata', away: 'San Andrés', isLibre: false },
  { date: '2026-03-28', round: 3, home: 'San Andrés', away: 'Pueyrredón', isLibre: false },
  { date: '2026-04-04', round: null, home: '', away: '', isLibre: true },
  { date: '2026-04-11', round: 4, home: 'San Fernando', away: 'San Andrés', isLibre: false, note: 'Entrenamos lunes' },
  { date: '2026-04-18', round: 5, home: 'San Andrés', away: 'Deportiva Francesa', isLibre: false },
  { date: '2026-04-25', round: 6, home: 'San Ciano', away: 'San Andrés', isLibre: false },
  { date: '2026-05-02', round: null, home: '', away: '', isLibre: true },
  { date: '2026-05-09', round: 7, home: 'San Andrés', away: 'San Albano', isLibre: false, note: 'Entrenamos lunes' },
  { date: '2026-05-16', round: 8, home: 'GEBA', away: 'San Andrés', isLibre: false },
  { date: '2026-05-23', round: 9, home: 'San Andrés', away: 'Olivos', isLibre: false },
  { date: '2026-05-30', round: null, home: '', away: '', isLibre: true },
  { date: '2026-06-06', round: 10, home: 'San Luis', away: 'San Andrés', isLibre: false, note: 'Entrenamos lunes' },
  { date: '2026-06-13', round: 11, home: 'San Andrés', away: 'Curupayti', isLibre: false },
  { date: '2026-06-20', round: 12, home: 'Lomas Athletic', away: 'San Andrés', isLibre: false },
  { date: '2026-06-27', round: null, home: '', away: '', isLibre: true },
  { date: '2026-07-04', round: 13, home: 'San Andrés', away: 'Hurling', isLibre: false, note: 'Entrenamos lunes — Se juega 14:00hs', specialTime: '14:00' },
  { date: '2026-07-11', round: 14, home: 'San Andrés', away: 'Pucará', isLibre: false, note: 'Se juega 14:00hs', specialTime: '14:00' },
  { date: '2026-07-18', round: null, home: '', away: '', isLibre: true },
  { date: '2026-08-01', round: 15, home: 'Pueyrredón', away: 'San Andrés', isLibre: false },
  { date: '2026-08-08', round: null, home: '', away: '', isLibre: true },
  { date: '2026-08-15', round: 17, home: 'San Andrés', away: 'San Fernando', isLibre: false },
  { date: '2026-08-22', round: 18, home: 'Deportiva Francesa', away: 'San Andrés', isLibre: false },
  { date: '2026-08-29', round: 19, home: 'San Andrés', away: 'San Ciano', isLibre: false, note: 'Se juega 14:00hs', specialTime: '14:00' },
  { date: '2026-09-05', round: 20, home: 'San Albano', away: 'San Andrés', isLibre: false },
  { date: '2026-09-12', round: 21, home: 'San Andrés', away: 'GEBA', isLibre: false },
  { date: '2026-09-19', round: null, home: '', away: '', isLibre: true },
  { date: '2026-09-26', round: 22, home: 'Olivos', away: 'San Andrés', isLibre: false, note: 'Entrenamos lunes' },
  { date: '2026-10-03', round: 23, home: 'San Andrés', away: 'San Luis', isLibre: false },
  { date: '2026-10-10', round: 24, home: 'Curupayti', away: 'San Andrés', isLibre: false },
  { date: '2026-10-17', round: 25, home: 'San Andrés', away: 'Lomas Athletic', isLibre: false },
  { date: '2026-10-24', round: 26, home: 'Hurling', away: 'San Andrés', isLibre: false },
  { date: '2026-10-31', round: null, home: 'SEMIFINALES', away: '', isLibre: false, isSemiOrFinal: true },
  { date: '2026-11-07', round: null, home: 'FINAL', away: '', isLibre: false, isSemiOrFinal: true },
  { date: '2026-11-14', round: null, home: 'San Andrés', away: 'San Luis', isLibre: false },
  { date: '2026-11-21', round: null, home: 'Seven de la URBA', away: '', isLibre: false },
]

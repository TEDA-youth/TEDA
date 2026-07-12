/* data/positions.js
   Open leadership and field positions. Matches the placeholder cards
   currently written directly into apply.html , wire that page's
   posGrid to read from here when confirmed openings are ready. */

const tedaPositions = [
  { id: 1, title: 'Zonal Coordinator, Soroti', category: 'exec', categoryLabel: 'Executive', desc: "Lead TEDA's activities and membership coordination across Soroti district.", deadline: '31 August 2026' },
  { id: 2, title: 'Zonal Coordinator, Kumi', category: 'exec', categoryLabel: 'Executive', desc: "Lead TEDA's activities and membership coordination across Kumi district.", deadline: '31 August 2026' },
  { id: 3, title: 'Communications Officer', category: 'exec', categoryLabel: 'Executive', desc: "Manage TEDA's social media, website updates, and public messaging.", deadline: '15 August 2026' },
  { id: 4, title: 'Institutional Ambassador', category: 'field', categoryLabel: 'Field', desc: 'Represent TEDA within your school or institution and grow local membership.', deadline: 'Rolling' },
  { id: 5, title: 'Health Programs Volunteer', category: 'field', categoryLabel: 'Field', desc: 'Support community health talks, hygiene campaigns, and health club formation.', deadline: 'Rolling' },
  { id: 6, title: 'Climate Action Volunteer', category: 'field', categoryLabel: 'Field', desc: 'Coordinate tree planting drives and climate awareness activities in your area.', deadline: 'Rolling' },
];

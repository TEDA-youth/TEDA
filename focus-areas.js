/* data/focus-areas.js
   TEDA's six focus areas, matching the real content already written
   into focus-areas.html (pulled from the original site's focus_areas.php,
   with the Leadership section text corrected to match its own checklist). */

const tedaFocusAreas = [
  {
    id: 'education', title: 'Education & Mentorship', color: 'var(--brown)', icon: 'fa-graduation-cap',
    checklist: [
      'Mentorship programs and leadership training',
      'Supporting vulnerable students to reduce school dropouts',
      'Community sensitization on the value of education',
      'Linking youth to scholarship and skilling opportunities',
    ],
  },
  {
    id: 'climate', title: 'Climate Change', color: 'var(--green)', icon: 'fa-leaf',
    checklist: [
      'Tree planting initiatives across communities',
      'Green housing promotion',
      'Environmental awareness programs',
      'Practical climate adaptation training',
      'Sustainable farming and agriculture skills',
    ],
  },
  {
    id: 'health', title: 'Health & Well-being', color: 'var(--blue)', icon: 'fa-heartbeat',
    checklist: [
      'Community health talks and sensitization',
      'Sanitation and hygiene awareness campaigns',
      'Malaria prevention and education',
      'Formation of school and community health clubs',
      'Reproductive health education programs',
    ],
  },
  {
    id: 'entrepreneurship', title: 'Entrepreneurship', color: 'var(--gold)', icon: 'fa-lightbulb',
    checklist: [
      'Practical vocational skills training (tailoring, soap making)',
      'Financial literacy and business planning',
      'Innovation and creative problem solving',
      'Entrepreneurship mentorship programs',
      'Support for youth led startup businesses',
    ],
  },
  {
    id: 'leadership', title: 'Youth Leadership & Civic Engagement', color: 'var(--purple)', icon: 'fa-landmark',
    checklist: [
      'Training young leaders in governance and accountability',
      'Amplifying youth voices in district and national forums',
      'Organizing the annual Teso Youth Forum',
      'Civic education and youth rights awareness',
      'Youth representation in decision making spaces',
    ],
  },
  {
    id: 'culture', title: 'Cultural Preservation', color: 'var(--teal)', icon: 'fa-drum',
    checklist: [
      'Promoting unity and pride in Teso heritage',
      'Strengthening intergenerational dialogue',
      'Cultural events and awareness programs',
      'Documenting and celebrating Teso traditions',
      'Connecting youth to their cultural identity',
    ],
  },
];

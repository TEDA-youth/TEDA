/* data/events.js
   Upcoming and past events. Dates/venues are placeholders , replace with
   your confirmed calendar. events.html currently has this same content
   written directly into its HTML; wire the page to read from this file
   when you're ready to make events editable without touching layout code. */

const tedaUpcomingEvents = [
  { id: 1, title: 'Annual Teso Youth Forum 2026', date: 'Saturday, 18 July 2026', dateShort: { day: '18', month: 'JUL' }, venue: 'ICU Offices, Soroti', desc: 'Harnessing Youth Potential, youth parliament, panel dialogues, and civic engagement.', img: 'https://picsum.photos/seed/evt1/500/320' },
  { id: 2, title: 'Tree Planting Drive', date: 'August 2026', dateShort: { day: '04', month: 'AUG' }, venue: 'Kumi District', desc: 'Climate action initiative with local schools, part of our climate and sustainable agriculture work.', img: 'https://picsum.photos/seed/evt2/500/320' },
  { id: 3, title: 'Entrepreneurship Bootcamp', date: 'August 2026', dateShort: { day: '22', month: 'AUG' }, venue: 'Soroti City', desc: 'Business skills, financial literacy, and vocational training for young founders.', img: 'https://picsum.photos/seed/evt3/500/320' },
  { id: 4, title: 'Community Health Outreach', date: 'September 2026', dateShort: { day: '10', month: 'SEP' }, venue: 'Amuria District', desc: 'Sanitation, hygiene, and malaria prevention sensitization with local health clubs.', img: 'https://picsum.photos/seed/evt4/500/320' },
  { id: 5, title: 'Digital Skills Workshop', date: 'September 2026', dateShort: { day: '28', month: 'SEP' }, venue: 'Soroti City', desc: 'Basic to intermediate computer literacy training for members and volunteers.', img: 'https://picsum.photos/seed/evt5/500/320' },
  { id: 6, title: 'Cultural Heritage Day', date: 'October 2026', dateShort: { day: '12', month: 'OCT' }, venue: 'Ngora District', desc: 'Celebrating Teso traditions and strengthening dialogue between youth and elders.', img: 'https://picsum.photos/seed/evt6/500/320' },
];

const tedaPastEvents = [
  { id: 101, title: 'Teso Youth Forum 2025', year: '2025', venue: 'Soroti', desc: 'Youth and leaders dialogued on governance, education, and climate action.', img: 'https://picsum.photos/seed/evtpast1/500/320' },
  { id: 102, title: 'Scholarship Awards Ceremony', year: '2025', venue: 'Soroti', desc: '50 scholarships awarded to vulnerable students across the Teso sub region.', img: 'https://picsum.photos/seed/evtpast2/500/320' },
  { id: 103, title: 'District Youth Dialogue', year: '2025', venue: 'Kumi', desc: 'Youth voices amplified at the district forum on accountable leadership.', img: 'https://picsum.photos/seed/evtpast3/500/320' },
];

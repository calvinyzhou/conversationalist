import { Location, Event, UserProfile } from '@/types';

// Sample data from multiple US cities (Philadelphia shown as demo)
export const sampleInterests = [
  'Feminist activism',
  'Writing & journalism',
  'Community organizing',
  'Labor rights',
  'Art & creativity',
  'Politics & policy',
  'Identity & culture',
  'Public speaking',
  'Conflict resolution',
  'Storytelling',
];

// Philadelphia demo data
export const phillyLocations: Location[] = [
  { city: 'Philadelphia', state: 'PA', area: 'Center City', coordinates: [39.9526, -75.1652] },
  { city: 'Philadelphia', state: 'PA', area: 'Fishtown', coordinates: [39.9694, -75.1292] },
  { city: 'Philadelphia', state: 'PA', area: 'Northern Liberties', coordinates: [39.9605, -75.1424] },
  { city: 'Philadelphia', state: 'PA', area: 'University City', coordinates: [39.9520, -75.1936] },
  { city: 'Philadelphia', state: 'PA', area: 'South Philadelphia', coordinates: [39.9389, -75.1689] },
  { city: 'Philadelphia', state: 'PA', area: 'West Philadelphia', coordinates: [39.9621, -75.2045] },
  { city: 'Philadelphia', state: 'PA', area: 'Old City', coordinates: [39.9518, -75.1446] },
  { city: 'Philadelphia', state: 'PA', area: 'Rittenhouse Square', coordinates: [39.9490, -75.1734] },
  { city: 'Philadelphia', state: 'PA', area: 'Fairmount', coordinates: [39.9680, -75.1730] },
];

// Sample events (using Philadelphia as demo)
export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Communication Workshop: Active Listening',
    type: 'workshop',
    description: 'A hands-on workshop focused on building empathy through active listening techniques. Learn to truly hear and understand others in meaningful conversations.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next Saturday
    time: '10:00 AM - 12:00 PM',
    location: {
      name: 'Community Center, Fishtown',
      city: 'Philadelphia',
      state: 'PA',
      area: 'Fishtown',
      coordinates: [39.9694, -75.1292],
    },
    capacity: 20,
    registeredUsers: ['user1', 'user2', 'user3'],
    facilitator: 'Dr. Sarah Chen',
    tags: ['active listening', 'empathy', 'communication'],
    learningObjectives: [
      'Understand the principles of active listening',
      'Practice reflective listening techniques',
      'Build empathy in conversations',
      'Apply skills in real-world scenarios',
    ],
  },
  {
    id: '2',
    title: 'Convention: Storytelling for Social Change',
    type: 'convention',
    description: 'A multi-day convention exploring how narrative techniques can drive social change. Join workshops, panels, and collaborative sessions.',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Next month
    time: '9:00 AM - 5:00 PM',
    location: {
      name: 'Northern Liberties Community Space',
      city: 'Philadelphia',
      state: 'PA',
      area: 'Northern Liberties',
      coordinates: [39.9605, -75.1424],
    },
    capacity: 100,
    registeredUsers: ['user4', 'user5'],
    facilitator: 'Maria Rodriguez & Team',
    tags: ['storytelling', 'social change', 'narrative', 'advocacy'],
    learningObjectives: [
      'Master narrative techniques for advocacy',
      'Craft compelling stories for social impact',
      'Connect storytelling to community organizing',
      'Build your storytelling portfolio',
    ],
  },
  {
    id: '3',
    title: 'Group Practice Session: Difficult Conversations',
    type: 'group-session',
    description: 'A weekly recurring guided practice session for navigating difficult conversations. Practice with real scenarios in a supportive group setting.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Next week
    time: '6:00 PM - 8:00 PM',
    location: {
      name: 'Center City Meeting Room',
      city: 'Philadelphia',
      state: 'PA',
      area: 'Center City',
      coordinates: [39.9526, -75.1652],
    },
    capacity: 12,
    registeredUsers: ['user6', 'user7', 'user8', 'user9'],
    facilitator: 'James Thompson',
    tags: ['difficult conversations', 'conflict resolution', 'practice'],
    learningObjectives: [
      'Navigate uncomfortable topics with grace',
      'De-escalate tense situations',
      'Practice real-world scenarios',
      'Build confidence in difficult dialogues',
    ],
  },
  {
    id: '4',
    title: 'Feminist Activism Meetup',
    type: 'meetup',
    description: 'Join fellow activists for an informal meetup to discuss current issues, share resources, and build community connections.',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    time: '7:00 PM - 9:00 PM',
    location: {
      name: 'Rittenhouse Square Café',
      city: 'Philadelphia',
      state: 'PA',
      area: 'Rittenhouse Square',
      coordinates: [39.9490, -75.1734],
    },
    capacity: 25,
    registeredUsers: ['user10'],
    facilitator: 'Community Organized',
    tags: ['activism', 'feminism', 'community', 'networking'],
    learningObjectives: [
      'Connect with like-minded activists',
      'Share resources and strategies',
      'Build local activist network',
    ],
  },
];

export const sampleUsers: UserProfile[] = [
  {
    id: 'user1',
    email: 'alex@example.com',
    displayName: 'Alex',
    location: { city: 'Philadelphia', state: 'PA', area: 'Fishtown', coordinates: [39.9694, -75.1292] },
    interests: ['Feminist activism', 'Writing & journalism', 'Public speaking'],
    traits: {
      communicationStyle: 'direct',
      personalityType: 'extroverted',
    },
    skills: ['Public speaking', 'Facilitation'],
    availability: {
      weekdays: true,
      weekends: true,
      times: ['evening'],
    },
    privacy: {
      showLocation: true,
      showInterests: true,
      showTraits: true,
    },
  },
  {
    id: 'user2',
    email: 'sam@example.com',
    displayName: 'Sam',
    location: { city: 'Philadelphia', state: 'PA', area: 'Center City', coordinates: [39.9526, -75.1652] },
    interests: ['Community organizing', 'Labor rights', 'Conflict resolution'],
    traits: {
      communicationStyle: 'collaborative',
      personalityType: 'introverted',
    },
    skills: ['Conflict resolution', 'Organizing'],
    availability: {
      weekdays: false,
      weekends: true,
      times: ['morning', 'afternoon'],
    },
    privacy: {
      showLocation: true,
      showInterests: true,
      showTraits: false,
    },
  },
  {
    id: 'user3',
    email: 'taylor@example.com',
    displayName: 'Taylor',
    location: { city: 'Philadelphia', state: 'PA', area: 'Northern Liberties', coordinates: [39.9605, -75.1424] },
    interests: ['Art & creativity', 'Storytelling', 'Identity & culture'],
    traits: {
      communicationStyle: 'creative',
      personalityType: 'ambiverted',
    },
    skills: ['Storytelling', 'Creative expression'],
    availability: {
      weekdays: true,
      weekends: false,
      times: ['evening'],
    },
    privacy: {
      showLocation: true,
      showInterests: true,
      showTraits: true,
    },
  },
  {
    id: 'user4',
    email: 'jamie@example.com',
    displayName: 'Jamie',
    location: { city: 'Philadelphia', state: 'PA', area: 'University City', coordinates: [39.9520, -75.1936] },
    interests: ['Politics & policy', 'Public speaking', 'Community organizing'],
    traits: {
      communicationStyle: 'analytical',
      personalityType: 'extroverted',
    },
    skills: ['Public speaking', 'Policy analysis'],
    availability: {
      weekdays: true,
      weekends: true,
      times: ['afternoon', 'evening'],
    },
    privacy: {
      showLocation: false,
      showInterests: true,
      showTraits: true,
    },
  },
  {
    id: 'user5',
    email: 'casey@example.com',
    displayName: 'Casey',
    location: { city: 'Philadelphia', state: 'PA', area: 'South Philadelphia', coordinates: [39.9389, -75.1689] },
    interests: ['Writing & journalism', 'Feminist activism', 'Storytelling'],
    traits: {
      communicationStyle: 'empathetic',
      personalityType: 'introverted',
    },
    skills: ['Writing', 'Active listening'],
    availability: {
      weekdays: false,
      weekends: true,
      times: ['morning'],
    },
    privacy: {
      showLocation: true,
      showInterests: true,
      showTraits: false,
    },
  },
];

// US Cities data for location selection
export const usCities = [
  { city: 'New York', state: 'NY', center: [40.7128, -74.0060] },
  { city: 'Los Angeles', state: 'CA', center: [34.0522, -118.2437] },
  { city: 'Chicago', state: 'IL', center: [41.8781, -87.6298] },
  { city: 'Houston', state: 'TX', center: [29.7604, -95.3698] },
  { city: 'Phoenix', state: 'AZ', center: [33.4484, -112.0740] },
  { city: 'Philadelphia', state: 'PA', center: [39.9526, -75.1652] },
  { city: 'San Antonio', state: 'TX', center: [29.4241, -98.4936] },
  { city: 'San Diego', state: 'CA', center: [32.7157, -117.1611] },
  { city: 'Dallas', state: 'TX', center: [32.7767, -96.7970] },
  { city: 'San Jose', state: 'CA', center: [37.3382, -121.8863] },
  { city: 'Austin', state: 'TX', center: [30.2672, -97.7431] },
  { city: 'Jacksonville', state: 'FL', center: [30.3322, -81.6557] },
  { city: 'Fort Worth', state: 'TX', center: [32.7555, -97.3308] },
  { city: 'Columbus', state: 'OH', center: [39.9612, -82.9988] },
  { city: 'Charlotte', state: 'NC', center: [35.2271, -80.8431] },
  { city: 'San Francisco', state: 'CA', center: [37.7749, -122.4194] },
  { city: 'Indianapolis', state: 'IN', center: [39.7684, -86.1581] },
  { city: 'Seattle', state: 'WA', center: [47.6062, -122.3321] },
  { city: 'Denver', state: 'CO', center: [39.7392, -104.9903] },
  { city: 'Boston', state: 'MA', center: [42.3601, -71.0589] },
];

// Default US center coordinates (Kansas, roughly center of US)
export const usCenter: [number, number] = [37.8283, -97.5795];

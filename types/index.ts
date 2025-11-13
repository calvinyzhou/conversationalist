export interface Location {
  city: string;
  state: string;
  area: string; // neighborhood, district, or area name
  coordinates: [number, number]; // [lat, lng]
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  location: Location;
  interests: string[];
  traits: {
    communicationStyle: string;
    personalityType: string;
  };
  skills: string[];
  availability: {
    weekdays: boolean;
    weekends: boolean;
    times: string[];
  };
  privacy: {
    showLocation: boolean;
    showInterests: boolean;
    showTraits: boolean;
  };
}

export type EventType = 'workshop' | 'convention' | 'group-session' | 'meetup';

export interface Event {
  id: string;
  title: string;
  type: EventType;
  description: string;
  date: Date;
  time: string;
  location: {
    name: string;
    city: string;
    state: string;
    area: string;
    coordinates: [number, number];
  };
  capacity: number;
  registeredUsers: string[];
  facilitator: string;
  tags: string[];
  learningObjectives: string[];
}

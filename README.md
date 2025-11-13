# The Conversationalist App

A web application that helps users form meaningful relationships and improve communication skills through local events and workshops across the United States. Built to empower Gen Z to have echo-chamber-breaking conversations.

## Mission

Breaking echo chambers, one conversation at a time. Empowering 1,000,000 Gen Z'ers to have meaningful, transformative conversations that bridge divides and build understanding.

## Features

### 🌎 Interactive Map
- Explore events and user density across the United States
- City search functionality with auto-zoom to major US cities
- Visual density indicators showing member concentrations by area
- Event markers with popup details and quick registration
- Smooth animations and responsive design

### 🎬 Event Discovery
- Browse workshops, conventions, group sessions, and meetups
- Advanced filtering by event type, location, and tags
- Search functionality across event titles, descriptions, and locations
- Detailed event pages with learning objectives and facilitator info
- Real-time capacity tracking and registration
- Event tags and categorization

### 👥 People Search & Discovery
- Find people with similar interests using advanced filters
- Filter by interests, area/neighborhood, and personality type
- Search by name, interests, or skills
- Respects privacy settings - only shows information users opt to share
- Detailed user profiles with skills, availability, and communication style
- Interest-based matching system

### ✨ User Profiles
- Create and manage comprehensive profiles
- Set location (city, state, area/neighborhood) across the US
- Add interests, skills, and communication traits
- Configure availability preferences (weekdays/weekends)
- Granular privacy controls for location, interests, and traits
- Edit profile with intuitive form interface

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brand colors
- **State Management**: Zustand
- **Maps**: Leaflet.js with React-Leaflet
- **Forms**: React Hook Form
- **Typography**: Inter font family
- **Icons**: Emojis and custom styling

## Design System

The app follows The Conversationalist's brand aesthetic:

- **Colors**:
  - Primary: Black (#000000) - Headers and primary actions
  - Accent: Yellow (#FFC107) - CTAs, highlights, and badges
  - Gradient: Orange → Pink → Purple - Headline text effects
  - Support: Blue, Pink, Purple, Green - Feature accents

- **Typography**:
  - Font: Inter (modern, bold sans-serif)
  - Headlines: Large, bold with gradient effects
  - Body: Clean, readable gray text

- **UI Elements**:
  - Bold, energetic buttons with hover animations
  - Rounded corners (rounded-xl, rounded-full)
  - Shadow effects for depth
  - Transform animations on hover (scale, translate)
  - Yellow accent borders on interactive cards

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd conversationalist
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
conversationalist/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Interactive map home page
│   ├── layout.tsx           # Root layout with fonts
│   ├── globals.css          # Global styles and utilities
│   ├── events/              # Events listing and detail pages
│   │   └── [id]/            # Individual event detail
│   ├── people/              # People search and profile pages
│   │   └── [id]/            # Individual user profile
│   └── profile/             # User profile management
├── components/               # React components
│   ├── Header.tsx           # Shared navigation header
│   ├── Map.tsx              # Leaflet map component
│   ├── MapWrapper.tsx       # Map wrapper with SSR handling
│   └── MapSearch.tsx        # City search component
├── data/                     # Sample data
│   └── sampleData.ts        # Events, users, cities data
├── store/                    # State management
│   └── useStore.ts          # Zustand store
├── types/                    # TypeScript types
│   └── index.ts             # Type definitions
└── tailwind.config.js        # Tailwind configuration
```

## Demo Mode

This app runs in **demo mode** - no authentication required. Users can:
- Browse all events and people without login
- Register for events (creates a temporary demo user automatically)
- Create and edit their profile
- Search and filter without restrictions
- Explore the map and use city search

## Key Features in Detail

### Map Features
- **City Search**: Search bar above map to zoom to major US cities
- **Event Markers**: Blue pins showing event locations with details
- **Density Visualization**: Blue circles indicating member density by area
- **Smooth Zooming**: Animated transitions when navigating to cities
- **Reset Function**: Button to return to US-wide view

### Event System
- **Types**: Workshop, Convention, Group Session, Meetup
- **Filtering**: By type, location, tags, or search query
- **Registration**: Real-time capacity tracking
- **Details**: Learning objectives, facilitator info, tags, location

### People Discovery
- **Multi-Filter**: Combine interests, area, personality type, and search
- **Privacy-Aware**: Only displays information users have opted to share
- **Interest Tags**: Visual badges for easy scanning
- **Profile Links**: Quick access to full user profiles

### Profile Management
- **Location**: City, state, and area/neighborhood selection
- **Interests**: Multi-select from predefined list
- **Skills**: Free-form comma-separated input
- **Communication Style**: Direct, collaborative, empathetic, analytical, creative
- **Personality**: Introverted, extroverted, ambiverted
- **Privacy Controls**: Granular settings for each data type

## Sample Data

The app includes sample data (using Philadelphia as demo):
- **5 sample users** from Philadelphia, PA with varied profiles
- **4 upcoming events** (workshops, conventions, group sessions, meetups)
- **Philadelphia neighborhood data** for demo purposes
- **20 major US cities** available in city search
- **10 predefined interests** for filtering and selection
- Various skills, traits, and communication styles

## Available Cities in Search

The city search includes: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Boston, and more.

## Build for Production

```bash
npm run build
npm start
```

## Development

### Key Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Design Notes

- **Brand Alignment**: Styled to match [The Conversationalist website](https://www.theconversationalist.com/)
- **Gen Z Aesthetic**: Bold colors, energetic animations, emoji use
- **Accessibility**: Semantic HTML, proper contrast ratios, keyboard navigation
- **Responsive**: Mobile-first design, works on all screen sizes
- **Performance**: Optimized with Next.js, dynamic imports for maps

## Notes

- This is a demo application with placeholder data
- No backend/database - all data is stored in client-side state
- Map uses OpenStreetMap tiles (no API key required)
- All features work without authentication for easy demo
- City search works with 20+ major US cities
- Profile coordinates auto-populate based on city selection

## Mission Statement

The Conversationalist is on a mission to empower 1,000,000 Gen Z'ers to have echo-chamber-breaking conversations. This app provides the tools and community to build meaningful relationships through communication workshops, events, and real connections.

## License

This project is for demonstration purposes.

import { sampleEvents } from '@/data/sampleData';
import EventDetailClient from './EventDetailClient';

// Generate static params for static export
export function generateStaticParams() {
  return sampleEvents.map((event) => ({
    id: event.id,
  }));
}

export default function EventDetailPage() {
  return <EventDetailClient />;
}

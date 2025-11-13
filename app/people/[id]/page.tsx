import { sampleUsers } from '@/data/sampleData';
import UserProfileClient from './UserProfileClient';

// Generate static params for static export
export function generateStaticParams() {
  return sampleUsers.map((user) => ({
    id: user.id,
  }));
}

export default function UserProfilePage() {
  return <UserProfileClient />;
}

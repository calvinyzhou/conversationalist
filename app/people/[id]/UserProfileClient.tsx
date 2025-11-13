'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { sampleUsers } from '@/data/sampleData';
import { UserProfile } from '@/types';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UserProfileClient() {
  const params = useParams();
  const { users } = useStore();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (users.length === 0) {
      useStore.setState({ users: sampleUsers });
    }
  }, [users.length]);

  useEffect(() => {
    const userId = params?.id as string;
    const foundUser = users.find((u) => u.id === userId) || 
                     sampleUsers.find((u) => u.id === userId);
    setUser(foundUser || null);
  }, [params?.id, users]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-blue mb-4">User not found</h1>
          <Link href="/people" className="text-accent-blue hover:underline">
            Back to People
          </Link>
        </div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/people"
          className="text-tc-blue font-bold hover:text-tc-purple transition-colors mb-6 inline-block"
        >
          ← Back to People
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6">
              {user.displayName}
            </h1>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {user.privacy.showLocation && (
                <div>
                  <h2 className="text-xl font-bold text-black mb-2">
                    📍 Location
                  </h2>
                  <p className="text-gray-700">{user.location.area}, {user.location.city}, {user.location.state}</p>
                </div>
              )}

              {user.privacy.showTraits && (
                <div>
                  <h2 className="text-xl font-bold text-black mb-2">
                    Communication Style
                  </h2>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Style:</span>{' '}
                      <span className="text-gray-700 capitalize">
                        {user.traits.communicationStyle}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Personality:</span>{' '}
                      <span className="text-gray-700 capitalize">
                        {user.traits.personalityType}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user.privacy.showInterests && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-tc-yellow bg-opacity-30 text-black rounded-full font-bold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-tc-blue bg-opacity-20 text-tc-blue rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Availability
              </h2>
              <div className="space-y-2 text-gray-700">
                <div>
                  <span className="font-semibold">Weekdays:</span>{' '}
                  {user.availability.weekdays ? 'Available' : 'Not available'}
                </div>
                <div>
                  <span className="font-semibold">Weekends:</span>{' '}
                  {user.availability.weekends ? 'Available' : 'Not available'}
                </div>
                {user.availability.times.length > 0 && (
                  <div>
                    <span className="font-semibold">Preferred times:</span>{' '}
                    {user.availability.times.join(', ')}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-8">
              <Link
                href="/events"
                className="block w-full text-center py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-md"
              >
                Find Shared Events
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


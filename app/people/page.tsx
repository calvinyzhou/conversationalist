'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { sampleUsers, sampleInterests } from '@/data/sampleData';
import { UserProfile } from '@/types';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PeoplePage() {
  const { users } = useStore();
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedPersonality, setSelectedPersonality] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (users.length === 0) {
      useStore.setState({ users: sampleUsers });
    }
  }, [users.length]);

  useEffect(() => {
    let filtered = users;

    // Filter by interests
    if (selectedInterests.length > 0) {
      filtered = filtered.filter((user) =>
        selectedInterests.some((interest) => user.interests.includes(interest))
      );
    }

    // Filter by area/neighborhood
    if (selectedNeighborhood !== 'all') {
      filtered = filtered.filter(
        (user) => user.location.area === selectedNeighborhood
      );
    }

    // Filter by personality type
    if (selectedPersonality !== 'all') {
      filtered = filtered.filter(
        (user) => user.traits.personalityType === selectedPersonality
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.displayName.toLowerCase().includes(query) ||
          user.interests.some((interest) => interest.toLowerCase().includes(query)) ||
          user.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Respect privacy settings
    filtered = filtered.filter((user) => {
      // Only show users who have opted to share their profile
      return user.privacy.showInterests || user.privacy.showLocation;
    });

    setFilteredUsers(filtered);
  }, [users, selectedInterests, selectedNeighborhood, selectedPersonality, searchQuery]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const areas = Array.from(
    new Set(users.map((u) => `${u.location.area}, ${u.location.city}`))
  ).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-5 mb-4">
            Find Your People <span className="gradient-text">👥</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Connect with people who share your interests, values, and communication goals.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="space-y-6">
            {/* Search */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Search
                </label>
              <input
                type="text"
                placeholder="Search by name, interests, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {sampleInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                      selectedInterests.includes(interest)
                        ? 'bg-tc-yellow text-black shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Location and Personality */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Area
                </label>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="all">All Areas</option>
                  {areas.map((area) => (
                    <option key={area} value={area.split(',')[0]}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Personality Type
                </label>
                <select
                  value={selectedPersonality}
                  onChange={(e) => setSelectedPersonality(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="all">All Types</option>
                  <option value="introverted">Introverted</option>
                  <option value="extroverted">Extroverted</option>
                  <option value="ambiverted">Ambiverted</option>
                </select>
              </div>
            </div>

            {/* Clear filters */}
            {(selectedInterests.length > 0 ||
              selectedNeighborhood !== 'all' ||
              selectedPersonality !== 'all' ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedInterests([]);
                  setSelectedNeighborhood('all');
                  setSelectedPersonality('all');
                  setSearchQuery('');
                }}
                className="text-tc-blue font-bold hover:text-tc-purple transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'}
          </p>
        </div>

        {/* User Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-600">
              No people found matching your criteria.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-tc-yellow transform hover:-translate-y-1 p-6"
              >
                <h3 className="text-xl font-bold text-black mb-3">
                  {user.displayName}
                </h3>

                {user.privacy.showLocation && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">📍</span>
                    <span className="text-sm text-gray-700 ml-1">
                      {user.location.area}, {user.location.city}, {user.location.state}
                    </span>
                  </div>
                )}

                {user.privacy.showInterests && (
                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-black mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.slice(0, 3).map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-tc-yellow bg-opacity-30 text-black rounded-full text-xs font-bold"
                        >
                          {interest}
                        </span>
                      ))}
                      {user.interests.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{user.interests.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {user.privacy.showTraits && (
                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-black mb-2">Style</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize">
                        {user.traits.communicationStyle}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize">
                        {user.traits.personalityType}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <h4 className="text-sm font-bold text-black mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-tc-blue bg-opacity-20 text-tc-blue rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/people/${user.id}`}
                  className="block mt-4 text-center px-4 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-md"
                >
                  View Profile
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

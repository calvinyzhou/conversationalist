'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { sampleUsers, sampleInterests, usCities, phillyLocations } from '@/data/sampleData';
import { UserProfile } from '@/types';
import { useForm } from 'react-hook-form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProfileFormData {
  displayName: string;
  city: string;
  state: string;
  area: string;
  interests: string[];
  communicationStyle: string;
  personalityType: string;
  skills: string[];
  weekdays: boolean;
  weekends: boolean;
  showLocation: boolean;
  showInterests: boolean;
  showTraits: boolean;
}

export default function ProfilePage() {
  const { currentUser, setCurrentUser, updateUser, users } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState<UserProfile | null>(currentUser);
  const { register, handleSubmit, watch, setValue } = useForm<ProfileFormData>();

  useEffect(() => {
    if (users.length === 0) {
      useStore.setState({ users: sampleUsers });
    }
  }, [users.length]);

  useEffect(() => {
    if (currentUser) {
      setLocalUser(currentUser);
      // Populate form with current user data
      setValue('displayName', currentUser.displayName);
      setValue('city', currentUser.location.city);
      setValue('state', currentUser.location.state);
      setValue('area', currentUser.location.area);
      setValue('interests', currentUser.interests);
      setValue('communicationStyle', currentUser.traits.communicationStyle);
      setValue('personalityType', currentUser.traits.personalityType);
      setValue('skills', currentUser.skills);
      setValue('weekdays', currentUser.availability.weekdays);
      setValue('weekends', currentUser.availability.weekends);
      setValue('showLocation', currentUser.privacy.showLocation);
      setValue('showInterests', currentUser.privacy.showInterests);
      setValue('showTraits', currentUser.privacy.showTraits);
    } else {
      // Create a demo user
      const demoUser: UserProfile = {
        id: 'demo-user',
        email: 'demo@example.com',
        displayName: 'Demo User',
        location: { city: 'Philadelphia', state: 'PA', area: 'Center City', coordinates: [39.9526, -75.1652] },
        interests: [],
        traits: { communicationStyle: '', personalityType: '' },
        skills: [],
        availability: { weekdays: false, weekends: false, times: [] },
        privacy: { showLocation: true, showInterests: true, showTraits: true },
      };
      setCurrentUser(demoUser);
      setLocalUser(demoUser);
    }
  }, [currentUser, setCurrentUser, setValue]);

  const onSubmit = (data: ProfileFormData) => {
    if (!localUser) return;

    // Find location coordinates from city data or use Philadelphia demo data
    const selectedCity = usCities.find((c) => c.city === data.city && c.state === data.state);
    let coordinates: [number, number] = [39.9526, -75.1652]; // Default to Philadelphia
    
    if (selectedCity) {
      coordinates = selectedCity.center as [number, number];
    } else if (data.city === 'Philadelphia' && data.state === 'PA') {
      // Use Philadelphia areas for demo
      const phillyArea = phillyLocations.find((l) => l.area === data.area);
      if (phillyArea) {
        coordinates = phillyArea.coordinates;
      }
    }

    const updatedUser: UserProfile = {
      ...localUser,
      displayName: data.displayName,
      location: {
        city: data.city,
        state: data.state,
        area: data.area,
        coordinates: coordinates,
      },
      interests: data.interests,
      traits: {
        communicationStyle: data.communicationStyle,
        personalityType: data.personalityType,
      },
      skills: Array.isArray(data.skills) 
        ? data.skills
        : typeof data.skills === 'string' && (data.skills as string).length > 0
        ? (data.skills as string).split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0) as string[]
        : [],
      availability: {
        weekdays: data.weekdays,
        weekends: data.weekends,
        times: [],
      },
      privacy: {
        showLocation: data.showLocation,
        showInterests: data.showInterests,
        showTraits: data.showTraits,
      },
    };

    setCurrentUser(updatedUser);
    setLocalUser(updatedUser);
    updateUser(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const selectedInterests = watch('interests') || [];

  const toggleInterest = (interest: string) => {
    const current = selectedInterests;
    const updated = current.includes(interest)
      ? current.filter((i: string) => i !== interest)
      : [...current, interest];
    setValue('interests', updated);
  };

  if (!localUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-5 mb-8">
          My Profile <span className="gradient-text">✨</span>
        </h1>

        {!isEditing ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-black">
                {localUser.displayName}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-tc-yellow text-black rounded-lg font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-md"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Location</h3>
                <p className="text-gray-700">{localUser.location.area}, {localUser.location.city}, {localUser.location.state}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {localUser.interests.length > 0 ? (
                    localUser.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-4 py-2 bg-tc-yellow bg-opacity-30 text-black rounded-full font-bold"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No interests added yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Style</h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full capitalize font-medium">
                    Communication: {localUser.traits.communicationStyle || 'Not set'}
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full capitalize font-medium">
                    Personality: {localUser.traits.personalityType || 'Not set'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {localUser.skills.length > 0 ? (
                    localUser.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-tc-blue bg-opacity-20 text-tc-blue rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Availability</h3>
                <p className="text-gray-700">
                  Weekdays: {localUser.availability.weekdays ? 'Available' : 'Not available'}
                </p>
                <p className="text-gray-700">
                  Weekends: {localUser.availability.weekends ? 'Available' : 'Not available'}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-2">Privacy Settings</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Show Location: {localUser.privacy.showLocation ? 'Yes' : 'No'}</p>
                  <p>Show Interests: {localUser.privacy.showInterests ? 'Yes' : 'No'}</p>
                  <p>Show Traits: {localUser.privacy.showTraits ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Display Name
                </label>
                <input
                  {...register('displayName', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  City
                </label>
                  <input
                    {...register('city', { required: true })}
                    placeholder="e.g., Philadelphia"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  State
                </label>
                  <select
                    {...register('state', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  >
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Area / Neighborhood
                </label>
                <input
                  {...register('area', { required: true })}
                  placeholder="e.g., Center City, Downtown, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {sampleInterests.map((interest: string) => (
                    <button
                      key={interest}
                      type="button"
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Communication Style
                  </label>
                  <select
                    {...register('communicationStyle')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  >
                    <option value="">Select...</option>
                    <option value="direct">Direct</option>
                    <option value="collaborative">Collaborative</option>
                    <option value="empathetic">Empathetic</option>
                    <option value="analytical">Analytical</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Personality Type
                  </label>
                  <select
                    {...register('personalityType')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  >
                    <option value="">Select...</option>
                    <option value="introverted">Introverted</option>
                    <option value="extroverted">Extroverted</option>
                    <option value="ambiverted">Ambiverted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Skills (comma-separated)
                </label>
                <input
                  {...register('skills')}
                  placeholder="e.g., Public speaking, Conflict resolution"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter skills separated by commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Availability
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('weekdays')}
                      className="mr-2"
                    />
                    Available on weekdays
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('weekends')}
                      className="mr-2"
                    />
                    Available on weekends
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Privacy Settings
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('showLocation')}
                      className="mr-2"
                    />
                    Show location to other users
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('showInterests')}
                      className="mr-2"
                    />
                    Show interests to other users
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('showTraits')}
                      className="mr-2"
                    />
                    Show communication traits to other users
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-md"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}

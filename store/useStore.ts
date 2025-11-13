import { create } from 'zustand';
import { UserProfile, Event } from '@/types';

interface AppState {
  currentUser: UserProfile | null;
  events: Event[];
  users: UserProfile[];
  setCurrentUser: (user: UserProfile | null) => void;
  addEvent: (event: Event) => void;
  registerForEvent: (eventId: string, userId: string) => void;
  updateUser: (user: UserProfile) => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  events: [],
  users: [],
  setCurrentUser: (user) => set({ currentUser: user }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  registerForEvent: (eventId, userId) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? { ...event, registeredUsers: [...event.registeredUsers, userId] }
          : event
      ),
    })),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
      currentUser: state.currentUser?.id === user.id ? user : state.currentUser,
    })),
}));

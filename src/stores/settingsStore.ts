import { create } from 'zustand';
import type { AppSettings } from '../models/settings';
import { settingsRepository } from '../db/repositories/settingsRepository';

interface SettingsState {
  settings: AppSettings;
  load: () => Promise<void>;
  update: (changes: Partial<Omit<AppSettings, 'id'>>) => Promise<void>;
}

const fallback: AppSettings = {
  id: 'app', weekStartsOn: 1, firstDayHour: 8, lastDayHour: 21,
  timeSlotMinutes: 30, defaultView: 'week', theme: 'system', locale: 'pt-PT', timezone: 'Europe/Lisbon'
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: fallback,
  load: async () => set({ settings: await settingsRepository.get() }),
  update: async (changes) => set({ settings: await settingsRepository.update(changes) }),
}));

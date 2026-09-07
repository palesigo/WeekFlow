import { db } from '../database';
import type { AppSettings } from '../../models/settings';

const defaults: AppSettings = {
  id: 'app', weekStartsOn: 1, firstDayHour: 8, lastDayHour: 21,
  timeSlotMinutes: 30, defaultView: 'week', theme: 'system', locale: 'pt-PT', timezone: 'Europe/Lisbon'
};

export const settingsRepository = {
  async get(): Promise<AppSettings> {
    return (await db.settings.get('app')) ?? defaults;
  },
  async update(changes: Partial<Omit<AppSettings, 'id'>>): Promise<AppSettings> {
    await db.settings.put({ ...(await this.get()), ...changes, id: 'app' });
    return this.get();
  },
};

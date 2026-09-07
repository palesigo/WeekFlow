import { db } from '../db/database';
import type { Activity } from '../models/activity';
import type { Person } from '../models/person';
import type { Category } from '../models/category';
import type { Period } from '../models/period';
import type { Recurrence } from '../models/recurrence';
import type { AppSettings } from '../models/settings';

export interface WeekFlowBackup {
  version: 1;
  exportedAt: string;
  appVersion: string;
  data: {
    activities: Activity[];
    people: Person[];
    categories: Category[];
    periods: Period[];
    recurrences: Recurrence[];
    settings: AppSettings[];
  };
}

export async function createBackup(): Promise<WeekFlowBackup> {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    appVersion: '0.3.0',
    data: {
      activities: await db.activities.toArray(),
      people: await db.people.toArray(),
      categories: await db.categories.toArray(),
      periods: await db.periods.toArray(),
      recurrences: await db.recurrences.toArray(),
      settings: await db.settings.toArray(),
    },
  };
}

export async function restoreBackup(backup: WeekFlowBackup): Promise<void> {
  if (!backup || backup.version !== 1 || !backup.data) {
    throw new Error('Ficheiro de backup inválido ou incompatível.');
  }

  // Dexie supports passing the tables as an array. This avoids the
  // TypeScript overload limit when the transaction contains all tables.
  await db.transaction(
    'rw',
    [
      db.activities,
      db.people,
      db.categories,
      db.periods,
      db.recurrences,
      db.settings,
    ],
    async () => {
      await db.activities.clear();
      await db.people.clear();
      await db.categories.clear();
      await db.periods.clear();
      await db.recurrences.clear();
      await db.settings.clear();

      await db.activities.bulkAdd(backup.data.activities);
      await db.people.bulkAdd(backup.data.people);
      await db.categories.bulkAdd(backup.data.categories);
      await db.periods.bulkAdd(backup.data.periods);
      await db.recurrences.bulkAdd(backup.data.recurrences);
      await db.settings.bulkAdd(backup.data.settings);
    },
  );
}

import { db } from '../database';
import type { Recurrence } from '../../models/recurrence';

export const recurrenceRepository = {
  getAll: () => db.recurrences.toArray(),
  getById: (id: string) => db.recurrences.get(id),
  create: (value: Recurrence) => db.recurrences.add(value),
  update: (id: string, changes: Partial<Recurrence>) => db.recurrences.update(id, { ...changes, updatedAt: new Date().toISOString() }),
  remove: (id: string) => db.recurrences.delete(id),
};

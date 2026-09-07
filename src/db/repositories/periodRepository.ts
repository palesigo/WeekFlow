import { db } from '../database';
import type { Period } from '../../models/period';
export const periodRepository = {
  getAll: () => db.periods.orderBy('startDate').toArray(),
  create: (period: Period) => db.periods.add(period),
  update: (id: string, changes: Partial<Period>) => db.periods.update(id, { ...changes, updatedAt: new Date().toISOString() }),
  remove: (id: string) => db.periods.delete(id),
};

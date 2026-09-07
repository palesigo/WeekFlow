import { db } from '../database';
import type { Activity } from '../../models/activity';

export const activityRepository = {
  getAll: () => db.activities.toArray(),
  getByDate: (date: string) => db.activities.where('date').equals(date).sortBy('startTime'),
  getById: (id: string) => db.activities.get(id),
  create: (activity: Activity) => db.activities.add(activity),
  update: (id: string, changes: Partial<Activity>) => db.activities.update(id, { ...changes, updatedAt: new Date().toISOString() }),
  remove: (id: string) => db.activities.delete(id),
};

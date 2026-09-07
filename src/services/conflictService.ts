import { toMinutes } from '../utils/time';
import type { Activity } from '../models/activity';

export function activitiesConflict(a: Activity, b: Activity): boolean {
  if (a.date !== b.date || a.id === b.id) return false;
  return toMinutes(a.startTime) < toMinutes(b.endTime) && toMinutes(a.endTime) > toMinutes(b.startTime);
}

export function findConflicts(activity: Activity, activities: Activity[]): Activity[] {
  return activities.filter(other => activitiesConflict(activity, other));
}

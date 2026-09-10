import { addDays, addMonths, differenceInCalendarDays, differenceInCalendarMonths, format, getDay, parseISO } from 'date-fns';
import type { Activity } from '../models/activity';
import type { Recurrence } from '../models/recurrence';

export function occursOnDate(rule: Recurrence, dateKey: string): boolean {
  const date = parseISO(dateKey);
  const start = parseISO(rule.startDate);
  if (date < start || (rule.endDate && dateKey > rule.endDate)) return false;
  if (rule.frequency === 'daily') return differenceInCalendarDays(date, start) % rule.interval === 0;
  if (rule.frequency === 'weekly') {
    const days = rule.daysOfWeek?.length ? rule.daysOfWeek : [getDay(start)];
    const weeks = Math.floor(differenceInCalendarDays(date, start) / 7);
    return weeks >= 0 && weeks % rule.interval === 0 && days.includes(getDay(date));
  }
  return differenceInCalendarMonths(date, start) % rule.interval === 0 && date.getDate() === start.getDate();
}

export function expandActivitiesForRange(activities: Activity[], recurrences: Recurrence[], startDate: Date, endDate: Date): Activity[] {
  const result: Activity[] = [];
  const rules = new Map(recurrences.map(r => [r.id, r]));
  for (const activity of activities) {
    if (!activity.recurrenceId) { result.push(activity); continue; }
    const rule = rules.get(activity.recurrenceId);
    if (!rule) { result.push(activity); continue; }
    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
      const key = format(d, 'yyyy-MM-dd');
      if (occursOnDate(rule, key)) {
        result.push({ ...activity, id: `${activity.id}__${key}`, date: key });
      }
    }
  }
  return result;
}

export function isRecurringActivity(activity: Activity): boolean {
  return Boolean(activity.recurrenceId);
}

import { format } from 'date-fns';
import { z } from 'zod';
import { activityRepository } from '../db/repositories/activityRepository';
import type { Activity } from '../models/activity';

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
export const activityInputSchema = z.object({
  title: z.string().trim().min(1, 'Indica um título.'),
  date: z.string(),
  startTime: timeSchema,
  endTime: timeSchema,
  categoryId: z.string().optional(),
  personIds: z.array(z.string()),
  location: z.string().optional(),
  notes: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  completed: z.boolean(),
}).refine((v) => v.startTime < v.endTime, { message: 'A hora de fim tem de ser posterior à hora de início.', path: ['endTime'] });

export type ActivityInput = z.infer<typeof activityInputSchema>;

export async function listActivities(date?: string) {
  return date ? activityRepository.getByDate(date) : activityRepository.getAll();
}

export async function createActivity(input: ActivityInput) {
  const parsed = activityInputSchema.parse(input);
  const now = new Date().toISOString();
  const activity: Activity = { id: crypto.randomUUID(), ...parsed, createdAt: now, updatedAt: now };
  await activityRepository.create(activity);
  return activity;
}

export async function updateActivity(id: string, input: ActivityInput) {
  const parsed = activityInputSchema.parse(input);
  await activityRepository.update(id, parsed);
  return activityRepository.getById(id);
}

export async function deleteActivity(id: string) { await activityRepository.remove(id); }

export function dateKey(date: Date) { return format(date, 'yyyy-MM-dd'); }

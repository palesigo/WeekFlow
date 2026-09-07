import { format } from 'date-fns';
import { z } from 'zod';
import { activityRepository } from '../db/repositories/activityRepository';
import { recurrenceRepository } from '../db/repositories/recurrenceRepository';
import type { Activity } from '../models/activity';
import type { Recurrence } from '../models/recurrence';

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
export const activityInputSchema = z.object({
  title: z.string().trim().min(1, 'Indica um título.'), date: z.string(), startTime: timeSchema, endTime: timeSchema,
  categoryId: z.string().optional(), personIds: z.array(z.string()), location: z.string().optional(), notes: z.string().optional(),
  icon: z.string().optional(), color: z.string().optional(), completed: z.boolean(), recurrence: z.object({
    frequency: z.enum(['daily','weekly','monthly']), interval: z.number().int().min(1).max(52), daysOfWeek: z.array(z.number().int().min(0).max(6)).optional(), endDate: z.string().optional()
  }).optional()
}).refine(v => v.startTime < v.endTime, { message: 'A hora de fim tem de ser posterior à hora de início.', path: ['endTime'] });
export type ActivityInput = z.infer<typeof activityInputSchema>;

export async function listActivities(date?: string) { return date ? activityRepository.getByDate(date) : activityRepository.getAll(); }

async function makeRecurrence(input: ActivityInput): Promise<string | undefined> {
  if (!input.recurrence) return undefined;
  const now = new Date().toISOString(); const id = crypto.randomUUID();
  const rule: Recurrence = { id, frequency: input.recurrence.frequency, interval: input.recurrence.interval, daysOfWeek: input.recurrence.daysOfWeek,
    startDate: input.date, endDate: input.recurrence.endDate || undefined, createdAt: now, updatedAt: now };
  await recurrenceRepository.create(rule); return id;
}

export async function createActivity(input: ActivityInput) {
  const parsed = activityInputSchema.parse(input); const now = new Date().toISOString(); const recurrenceId = await makeRecurrence(parsed);
  const activity: Activity = { id: crypto.randomUUID(), title: parsed.title, date: parsed.date, startTime: parsed.startTime, endTime: parsed.endTime,
    categoryId: parsed.categoryId, personIds: parsed.personIds, location: parsed.location, notes: parsed.notes, icon: parsed.icon, color: parsed.color,
    recurrenceId, completed: parsed.completed, createdAt: now, updatedAt: now };
  await activityRepository.create(activity); return activity;
}

export async function updateActivity(id: string, input: ActivityInput) {
  const parsed = activityInputSchema.parse(input); const current = await activityRepository.getById(id); if (!current) throw new Error('Atividade não encontrada.');
  await activityRepository.update(id, { ...parsed, recurrenceId: current.recurrenceId }); return activityRepository.getById(id);
}
export async function deleteActivity(id: string) { const current = await activityRepository.getById(id); await activityRepository.remove(id); if (current?.recurrenceId) await recurrenceRepository.remove(current.recurrenceId); }
export async function rescheduleActivity(id: string, date: string, startTime: string, endTime: string) { await activityRepository.update(id, { date, startTime, endTime }); }
export function dateKey(date: Date) { return format(date, 'yyyy-MM-dd'); }

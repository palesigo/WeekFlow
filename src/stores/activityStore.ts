import { create } from 'zustand';
import type { Activity } from '../models/activity';
import { createActivity, deleteActivity, listActivities, rescheduleActivity, updateActivity, type ActivityInput } from '../services/activityService';
interface ActivityState { activities: Activity[]; loading: boolean; load: (date?: string) => Promise<void>; add: (input: ActivityInput) => Promise<void>; update: (id: string, input: ActivityInput) => Promise<void>; remove: (id: string) => Promise<void>; reschedule: (id: string, date: string, start: string, end: string) => Promise<void>; }
export const useActivityStore = create<ActivityState>((set) => ({ activities: [], loading: false,
 load: async (date) => { set({ loading: true }); set({ activities: await listActivities(date), loading: false }); },
 add: async input => { await createActivity(input); set({ activities: await listActivities() }); },
 update: async (id,input) => { await updateActivity(id,input); set({ activities: await listActivities() }); },
 remove: async id => { await deleteActivity(id); set({ activities: await listActivities() }); },
 reschedule: async (id,date,start,end) => { await rescheduleActivity(id,date,start,end); set({ activities: await listActivities() }); },
}));

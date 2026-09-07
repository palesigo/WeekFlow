export type RecurrenceFrequency = "daily" | "weekly" | "monthly";

export interface Recurrence {
  id: string;
  frequency: RecurrenceFrequency;
  interval: number;
  daysOfWeek?: number[];
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
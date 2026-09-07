export interface Activity {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  categoryId?: string;
  personIds: string[];
  location?: string;
  notes?: string;
  icon?: string;
  color?: string;
  recurrenceId?: string;
  periodId?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
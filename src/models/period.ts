export type PeriodType = "school" | "holiday" | "trip" | "special" | "custom";

export interface Period {
  id: string;
  name: string;
  type: PeriodType;
  startDate: string;
  endDate: string;
  color: string;
  icon?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
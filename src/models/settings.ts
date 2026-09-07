export interface AppSettings {
  id: "app";
  weekStartsOn: 0 | 1;
  firstDayHour: number;
  lastDayHour: number;
  timeSlotMinutes: 15 | 30 | 60;
  defaultView: "week" | "today";
  theme: "system" | "light" | "dark";
  locale: string;
  timezone: string;
}
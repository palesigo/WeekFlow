import Dexie, { type Table } from "dexie";
import type { Activity } from "../models/activity";
import type { Person } from "../models/person";
import type { Category } from "../models/category";
import type { Period } from "../models/period";
import type { Recurrence } from "../models/recurrence";
import type { AppSettings } from "../models/settings";

export class WeekFlowDatabase extends Dexie {
  activities!: Table<Activity, string>;
  people!: Table<Person, string>;
  categories!: Table<Category, string>;
  periods!: Table<Period, string>;
  recurrences!: Table<Recurrence, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super("WeekFlowDB");

    this.version(1).stores({
      activities: "id, date, categoryId, periodId, recurrenceId, *personIds",
      people: "id, name, active",
      categories: "id, name, position",
      periods: "id, startDate, endDate, type",
      recurrences: "id, frequency, startDate, endDate",
      settings: "id"
    });
  }
}

export const db = new WeekFlowDatabase();
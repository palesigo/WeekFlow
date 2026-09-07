import { db } from '../database';
export const periodRepository = { getAll: () => db.periods.orderBy('startDate').toArray() };

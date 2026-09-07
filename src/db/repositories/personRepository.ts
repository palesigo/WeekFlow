import { db } from '../database';
import type { Person } from '../../models/person';

export const personRepository = {
  getAll: () => db.people.orderBy('name').toArray(),
  create: (person: Person) => db.people.add(person),
  update: (id: string, changes: Partial<Person>) => db.people.update(id, { ...changes, updatedAt: new Date().toISOString() }),
  remove: (id: string) => db.people.delete(id),
};

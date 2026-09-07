import { db } from '../database';
import type { Category } from '../../models/category';

export const categoryRepository = {
  getAll: () => db.categories.orderBy('position').toArray(),
  create: (category: Category) => db.categories.add(category),
  update: (id: string, changes: Partial<Category>) => db.categories.update(id, { ...changes, updatedAt: new Date().toISOString() }),
  remove: (id: string) => db.categories.delete(id),
};

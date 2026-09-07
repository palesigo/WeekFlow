import { create } from 'zustand';
import { categoryRepository } from '../db/repositories/categoryRepository';
import { personRepository } from '../db/repositories/personRepository';
import type { Category } from '../models/category';
import type { Person } from '../models/person';

interface CatalogState { categories: Category[]; people: Person[]; load: () => Promise<void>; }
export const useCatalogStore = create<CatalogState>((set) => ({
  categories: [], people: [],
  load: async () => set({ categories: await categoryRepository.getAll(), people: await personRepository.getAll() }),
}));

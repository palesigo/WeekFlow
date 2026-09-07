import { format } from "date-fns";
import { db } from "./database";

export async function seedDatabase() {
  const categoryCount = await db.categories.count();

  if (categoryCount === 0) {
    const now = new Date().toISOString();

    await db.categories.bulkAdd([
      { id: "school", name: "Escola", icon: "🏫", color: "#3b82f6", position: 1, system: true, createdAt: now, updatedAt: now },
      { id: "sport", name: "Desporto", icon: "⚽", color: "#22c55e", position: 2, system: true, createdAt: now, updatedAt: now },
      { id: "study", name: "Estudo", icon: "📚", color: "#8b5cf6", position: 3, system: true, createdAt: now, updatedAt: now },
      { id: "holiday", name: "Férias", icon: "🏖️", color: "#f59e0b", position: 4, system: true, createdAt: now, updatedAt: now },
      { id: "family", name: "Família", icon: "👨‍👩‍👧‍👦", color: "#f97316", position: 5, system: true, createdAt: now, updatedAt: now }
    ]);
  }

  if (await db.settings.count() === 0) {
    await db.settings.put({
      id: "app",
      weekStartsOn: 1,
      firstDayHour: 8,
      lastDayHour: 21,
      timeSlotMinutes: 30,
      defaultView: "week",
      theme: "system",
      locale: "pt-PT",
      timezone: "Europe/Lisbon"
    });
  }

  if (await db.activities.count() === 0) {
    const today = format(new Date(), "yyyy-MM-dd");
    await db.activities.add({
      id: crypto.randomUUID(),
      title: "Exemplo",
      date: today,
      startTime: "17:00",
      endTime: "18:00",
      categoryId: "sport",
      personIds: [],
      icon: "⚽",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
}
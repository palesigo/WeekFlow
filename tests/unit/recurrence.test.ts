import type { Activity } from '../../src/models/activity';
import { isRecurringActivity,  describe, expect, it } from 'vitest';
import { occursOnDate } from '../../src/services/recurrenceService';
import { activitiesConflict } from '../../src/services/conflictService';

describe('recurrence',()=>{
 it('recognizes weekly weekdays',()=>{const r={id:'r',frequency:'weekly' as const,interval:1,daysOfWeek:[1,3],startDate:'2026-09-07',createdAt:'',updatedAt:''};expect(occursOnDate(r,'2026-09-07')).toBe(true);expect(occursOnDate(r,'2026-09-08')).toBe(false);expect(occursOnDate(r,'2026-09-09')).toBe(true)});
 it('respects end date',()=>{const r={id:'r',frequency:'daily' as const,interval:1,startDate:'2026-09-07',endDate:'2026-09-08',createdAt:'',updatedAt:''};expect(occursOnDate(r,'2026-09-09')).toBe(false)});
});

describe('conflicts',()=>{const base={id:'a',title:'',date:'2026-09-07',startTime:'10:00',endTime:'11:00',personIds:[],completed:false,createdAt:'',updatedAt:''};it('detects overlap',()=>expect(activitiesConflict(base,{...base,id:'b',startTime:'10:30',endTime:'11:30'})).toBe(true));it('allows adjacent activities',()=>expect(activitiesConflict(base,{...base,id:'b',startTime:'11:00',endTime:'12:00'})).toBe(false));});


test('identifica atividades recorrentes pela recurrenceId', () => {
  const base = { recurrenceId: 'r1' } as Activity;
  const normal = {} as Activity;
  expect(isRecurringActivity(base)).toBe(true);
  expect(isRecurringActivity(normal)).toBe(false);
});

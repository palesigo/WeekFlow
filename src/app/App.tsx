import { CalendarDays, ChevronLeft, ChevronRight, Plus, Clock3, CalendarRange, Settings, X } from 'lucide-react';
import { addDays, format, startOfWeek } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import type { Activity } from '../models/activity';
import { useActivityStore } from '../stores/activityStore';
import { useCatalogStore } from '../stores/catalogStore';
import { ActivityForm } from '../components/activity/ActivityForm';
import { activityStyle } from '../utils/time';
import { TodayPage } from '../pages/TodayPage';
import { PeriodsPage } from '../pages/PeriodsPage';
import { SettingsPage } from '../pages/SettingsPage';

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7);
type View = 'week'|'today'|'periods'|'settings';

export function App(){
 const [selectedDate,setSelectedDate]=useState(new Date()); const [view,setView]=useState<View>('week'); const [editing,setEditing]=useState<Activity|null>(null); const [creating,setCreating]=useState(false);
 const activities=useActivityStore(s=>s.activities); const load=useActivityStore(s=>s.load); const loadCatalog=useCatalogStore(s=>s.load); const weekStart=startOfWeek(selectedDate,{weekStartsOn:1});
 useEffect(()=>{void load();void loadCatalog()},[load,loadCatalog]);
 const days=useMemo(()=>Array.from({length:7},(_,i)=>addDays(weekStart,i)),[weekStart]);
 const moveWeek=(n:number)=>setSelectedDate(addDays(selectedDate,n*7));
 const openCreate=(date=selectedDate)=>{setSelectedDate(date);setCreating(true)};
 const nav=(v:View)=>{setView(v);if(v==='today')setSelectedDate(new Date())};
 const categoryName=(id?:string)=>useCatalogStore.getState().categories.find(c=>c.id===id)?.name;
 return <main className="app-shell"><header className="topbar"><div><div className="brand">WeekFlow</div><div className="subtitle">Planeador semanal</div></div><CalendarDays size={22}/></header>
 {view==='week' && <><section className="week-toolbar"><button onClick={()=>moveWeek(-1)} aria-label="Semana anterior"><ChevronLeft/></button><button className="today-button" onClick={()=>setSelectedDate(new Date())}>{format(weekStart,'d MMM',{locale:pt})} — {format(addDays(weekStart,6),'d MMM yyyy',{locale:pt})}</button><button onClick={()=>moveWeek(1)} aria-label="Semana seguinte"><ChevronRight/></button></section><section className="calendar"><div className="time-column"><div className="corner"/>{HOURS.map(h=><div className="time-label" key={h}>{String(h).padStart(2,'0')}:00</div>)}</div><div className="days-grid">{days.map(day=>{const key=format(day,'yyyy-MM-dd');const dayActivities=activities.filter(a=>a.date===key);return <div className={`day-column ${key===format(selectedDate,'yyyy-MM-dd')?'selected':''}`} key={key} onClick={()=>setSelectedDate(day)}><div className="day-header"><span>{format(day,'EEE',{locale:pt}).slice(0,3)}</span><strong>{format(day,'d')}</strong></div><div className="day-body">{HOURS.map(h=><div className="hour-cell" key={h} onDoubleClick={()=>openCreate(day)}/>)}{dayActivities.map(a=>{const st=activityStyle(a.startTime,a.endTime);return <button className={`activity-card ${a.completed?'completed':''}`} style={st} key={a.id} onClick={e=>{e.stopPropagation();setEditing(a)}}><span>{a.icon??'📅'}</span><b>{a.title}</b><small>{a.startTime}–{a.endTime}{categoryName(a.categoryId)?` · ${categoryName(a.categoryId)}`:''}</small></button>})}</div></div>})}</div></section></>}
 {view==='today'&&<TodayPage onEdit={setEditing}/>} {view==='periods'&&<PeriodsPage/>} {view==='settings'&&<SettingsPage/>}
 <button className="fab" onClick={()=>openCreate()} aria-label="Adicionar atividade"><Plus size={26}/></button>
 <nav className="bottom-nav"><button className={view==='week'?'active':''} onClick={()=>nav('week')}><CalendarDays/><span>Semana</span></button><button className={view==='today'?'active':''} onClick={()=>nav('today')}><Clock3/><span>Hoje</span></button><button className={view==='periods'?'active':''} onClick={()=>nav('periods')}><CalendarRange/><span>Períodos</span></button><button className={view==='settings'?'active':''} onClick={()=>nav('settings')}><Settings/><span>Definições</span></button></nav>
 {(creating||editing)&&<ActivityForm date={editing?.date ?? format(selectedDate,'yyyy-MM-dd')} activity={editing} onClose={()=>{setCreating(false);setEditing(null);void load()}}/>}
 </main>
}

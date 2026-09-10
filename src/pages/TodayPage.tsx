import { CheckCircle2, Circle, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useState } from 'react';
import type { Activity } from '../models/activity';
import { useActivityStore } from '../stores/activityStore';
import { useCatalogStore } from '../stores/catalogStore';
import { ActivityForm } from '../components/activity/ActivityForm';

interface Props { onEdit: (a: Activity) => void; }
export function TodayPage({ onEdit }: Props) {
  const [open, setOpen] = useState(false); const today = format(new Date(), 'yyyy-MM-dd');
  const activities = useActivityStore(s => s.activities).filter(a => a.date === today).sort((a,b)=>a.startTime.localeCompare(b.startTime));
  const update = useActivityStore(s => s.update);
  const people = useCatalogStore(s => s.people);
  return <div className="page"><div className="page-heading"><div><h1>Hoje</h1><p>{format(new Date(), "EEEE, d 'de' MMMM", { locale: pt })}</p></div><button className="primary-btn" onClick={() => setOpen(true)}><Plus size={17}/> Atividade</button></div><div className="today-list">{activities.length === 0 ? <div className="empty">Nada planeado para hoje. Aproveita a paz. 😄</div> : activities.map(a => <button className="today-card" key={a.id} onClick={() => onEdit(a)}><span className={`status ${a.completed ? 'done' : ''}`} onClick={async e => { e.stopPropagation(); await update(a.id, {title:a.title,date:a.date,startTime:a.startTime,endTime:a.endTime,categoryId:a.categoryId,personIds:a.personIds,location:a.location,notes:a.notes,icon:a.icon,color:a.color,completed:!a.completed}); }} >{a.completed ? <CheckCircle2/> : <Circle/>}</span><span className="today-time">{a.startTime}<small>{a.endTime}</small></span><span className="today-main"><b>{a.icon ?? '📅'} {a.title}</b><small>{a.location || 'Sem local'} {a.personIds.length ? `· ${a.personIds.map(id => people.find(p => p.id === id)?.name).filter(Boolean).join(', ')}` : ''}</small></span></button>)}</div>{open && <ActivityForm date={today} onClose={() => setOpen(false)} />}</div>;
}

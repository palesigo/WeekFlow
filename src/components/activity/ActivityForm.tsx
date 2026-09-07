import { useEffect, useState } from 'react';
import { Repeat2, Trash2, X } from 'lucide-react';
import type { Activity } from '../../models/activity';
import { useActivityStore } from '../../stores/activityStore';
import { useCatalogStore } from '../../stores/catalogStore';
import type { ActivityInput } from '../../services/activityService';

interface Props { date: string; activity?: Activity | null; onClose: () => void; }
const blank = (date: string): ActivityInput => ({ title:'', date, startTime:'17:00', endTime:'18:00', categoryId:undefined, personIds:[], location:'', notes:'', icon:'📅', color:'', completed:false });
const weekdays = [['S','Domingo'],['S','Segunda'],['T','Terça'],['Q','Quarta'],['Q','Quinta'],['S','Sexta'],['S','Sábado']];

export function ActivityForm({ date, activity, onClose }: Props) {
 const { add, update, remove } = useActivityStore(); const { categories, people } = useCatalogStore();
 const [form,setForm]=useState<ActivityInput>(activity ? {...activity, recurrence:undefined, location:activity.location??'',notes:activity.notes??'',icon:activity.icon??'📅',color:activity.color??''} : blank(date));
 const [recurring,setRecurring]=useState(false); const [error,setError]=useState('');
 useEffect(()=>{setForm(activity ? {...activity, recurrence:undefined, location:activity.location??'',notes:activity.notes??'',icon:activity.icon??'📅',color:activity.color??''} : blank(date)); setRecurring(false);setError('')},[activity,date]);
 const set=<K extends keyof ActivityInput>(k:K,v:ActivityInput[K])=>setForm(f=>({...f,[k]:v}));
 const toggleDay=(day:number)=>{const days=form.recurrence?.daysOfWeek??[1,2,3,4,5];const next=days.includes(day)?days.filter(d=>d!==day):[...days,day].sort();set('recurrence',{...(form.recurrence??{frequency:'weekly',interval:1}),daysOfWeek:next});};
 const submit=async(e:React.FormEvent)=>{e.preventDefault();setError('');try{await (activity?update(activity.id,form):add(form));onClose()}catch(err){setError(err instanceof Error?err.message:'Não foi possível guardar.')}};
 const confirmDelete=async()=>{if(activity&&confirm('Eliminar esta atividade?')){await remove(activity.id);onClose()}};
 return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><form className="sheet wide-sheet" onSubmit={submit}>
  <div className="sheet-header"><div><div className="sheet-title">{activity?'Editar atividade':'Nova atividade'}</div><div className="muted">{date}{activity?.recurrenceId?' · atividade recorrente':''}</div></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div>
  <label>Título<input autoFocus value={form.title} onChange={e=>set('title',e.target.value)} placeholder="Ex.: Treino de futebol"/></label>
  <div className="form-grid"><label>Data<input type="date" value={form.date} onChange={e=>set('date',e.target.value)}/></label><label>Início<input type="time" value={form.startTime} onChange={e=>set('startTime',e.target.value)}/></label><label>Fim<input type="time" value={form.endTime} onChange={e=>set('endTime',e.target.value)}/></label></div>
  <label>Categoria<select value={form.categoryId??''} onChange={e=>set('categoryId',e.target.value||undefined)}><option value="">Sem categoria</option>{categories.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></label>
  <label>Pessoas<div className="chips">{people.filter(p=>p.active).map(p=><button type="button" key={p.id} className={`chip ${form.personIds.includes(p.id)?'selected':''}`} onClick={()=>set('personIds',form.personIds.includes(p.id)?form.personIds.filter(x=>x!==p.id):[...form.personIds,p.id])}>{p.icon??'👤'} {p.name}</button>)}</div></label>
  {!activity && <section className="recurrence-box"><div className="recurrence-head"><label className="check"><input type="checkbox" checked={recurring} onChange={e=>{setRecurring(e.target.checked);if(e.target.checked&&!form.recurrence)set('recurrence',{frequency:'weekly',interval:1,daysOfWeek:[1,2,3,4,5]})}}/><Repeat2 size={17}/> Repetir atividade</label></div>{recurring&&<div className="recurrence-options"><div className="form-grid"><label>Frequência<select value={form.recurrence?.frequency??'weekly'} onChange={e=>set('recurrence',{...(form.recurrence!),frequency:e.target.value as 'daily'|'weekly'|'monthly'})}><option value="daily">Diária</option><option value="weekly">Semanal</option><option value="monthly">Mensal</option></select></label><label>Intervalo<input type="number" min={1} max={52} value={form.recurrence?.interval??1} onChange={e=>set('recurrence',{...(form.recurrence!),interval:Number(e.target.value)})}/></label><label>Até<input type="date" value={form.recurrence?.endDate??''} onChange={e=>set('recurrence',{...(form.recurrence!),endDate:e.target.value||undefined})}/></label></div>{form.recurrence?.frequency==='weekly'&&<div className="weekday-picker">{weekdays.map((d,i)=><button type="button" key={i} className={`weekday ${form.recurrence?.daysOfWeek?.includes(i)?'selected':''}`} title={d[1]} onClick={()=>toggleDay(i)}>{d[0]}</button>)}</div>}</div>}</section>}
  <div className="form-grid"><label>Local<input value={form.location??''} onChange={e=>set('location',e.target.value)} placeholder="Local"/></label><label>Ícone<input value={form.icon??''} maxLength={2} onChange={e=>set('icon',e.target.value)}/></label></div>
  <label>Notas<textarea value={form.notes??''} onChange={e=>set('notes',e.target.value)} rows={3} placeholder="Notas opcionais"/></label>
  <label className="check"><input type="checkbox" checked={form.completed} onChange={e=>set('completed',e.target.checked)}/> Concluída</label>
  {error&&<div className="form-error">{error}</div>}
  <div className="sheet-actions">{activity&&<button type="button" className="danger-btn" onClick={confirmDelete}><Trash2 size={17}/> Eliminar</button>}<span/><button type="button" className="secondary-btn" onClick={onClose}>Cancelar</button><button className="primary-btn">Guardar</button></div>
 </form></div>
}

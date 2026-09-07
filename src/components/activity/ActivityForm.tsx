import { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { Activity } from '../../models/activity';
import { useActivityStore } from '../../stores/activityStore';
import { useCatalogStore } from '../../stores/catalogStore';
import type { ActivityInput } from '../../services/activityService';

interface Props { date: string; activity?: Activity | null; onClose: () => void; }
const blank = (date: string): ActivityInput => ({ title: '', date, startTime: '17:00', endTime: '18:00', categoryId: undefined, personIds: [], location: '', notes: '', icon: '📅', color: '', completed: false });

export function ActivityForm({ date, activity, onClose }: Props) {
  const { add, update, remove } = useActivityStore();
  const { categories, people } = useCatalogStore();
  const [form, setForm] = useState<ActivityInput>(activity ? { title: activity.title, date: activity.date, startTime: activity.startTime, endTime: activity.endTime, categoryId: activity.categoryId, personIds: activity.personIds, location: activity.location ?? '', notes: activity.notes ?? '', icon: activity.icon ?? '📅', color: activity.color ?? '', completed: activity.completed } : blank(date));
  const [error, setError] = useState('');
  useEffect(() => { setForm(activity ? { title: activity.title, date: activity.date, startTime: activity.startTime, endTime: activity.endTime, categoryId: activity.categoryId, personIds: activity.personIds, location: activity.location ?? '', notes: activity.notes ?? '', icon: activity.icon ?? '📅', color: activity.color ?? '', completed: activity.completed } : blank(date)); }, [activity, date]);
  const set = <K extends keyof ActivityInput>(key: K, value: ActivityInput[K]) => setForm((f) => ({ ...f, [key]: value }));
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setError(''); try { activity ? await update(activity.id, form) : await add(form); onClose(); } catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível guardar.'); } };
  const togglePerson = (id: string) => set('personIds', form.personIds.includes(id) ? form.personIds.filter((x) => x !== id) : [...form.personIds, id]);
  const confirmDelete = async () => { if (activity && confirm('Eliminar esta atividade?')) { await remove(activity.id); onClose(); } };
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><form className="sheet" onSubmit={submit}>
    <div className="sheet-header"><div><div className="sheet-title">{activity ? 'Editar atividade' : 'Nova atividade'}</div><div className="muted">{date}</div></div><button type="button" className="icon-btn" onClick={onClose}><X /></button></div>
    <label>Título<input autoFocus value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Ex.: Treino de futebol" /></label>
    <div className="form-grid"><label>Início<input type="time" value={form.startTime} onChange={(e) => set('startTime', e.target.value)} /></label><label>Fim<input type="time" value={form.endTime} onChange={(e) => set('endTime', e.target.value)} /></label></div>
    <label>Categoria<select value={form.categoryId ?? ''} onChange={(e) => set('categoryId', e.target.value || undefined)}><option value="">Sem categoria</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></label>
    <label>Pessoas<div className="chips">{people.filter(p => p.active).map(p => <button type="button" key={p.id} className={`chip ${form.personIds.includes(p.id) ? 'selected' : ''}`} onClick={() => togglePerson(p.id)}>{p.icon ?? '👤'} {p.name}</button>)}</div></label>
    <div className="form-grid"><label>Local<input value={form.location ?? ''} onChange={(e) => set('location', e.target.value)} placeholder="Local" /></label><label>Ícone<input value={form.icon ?? ''} maxLength={2} onChange={(e) => set('icon', e.target.value)} /></label></div>
    <label>Notas<textarea value={form.notes ?? ''} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="Notas opcionais" /></label>
    <label className="check"><input type="checkbox" checked={form.completed} onChange={(e) => set('completed', e.target.checked)} /> Concluída</label>
    {error && <div className="form-error">{error}</div>}
    <div className="sheet-actions">{activity && <button type="button" className="danger-btn" onClick={confirmDelete}><Trash2 size={17}/> Eliminar</button>}<span /><button type="button" className="secondary-btn" onClick={onClose}>Cancelar</button><button className="primary-btn">Guardar</button></div>
  </form></div>;
}

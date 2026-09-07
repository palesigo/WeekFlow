import { useEffect, useState } from 'react';
import { periodRepository } from '../db/repositories/periodRepository';
import type { Period } from '../models/period';
export function PeriodsPage(){ const [periods,setPeriods]=useState<Period[]>([]); useEffect(()=>{void periodRepository.getAll().then(setPeriods)},[]); return <div className="page"><div className="page-heading"><div><h1>Períodos</h1><p>Escola, férias, viagens e ocasiões especiais.</p></div></div><div className="period-grid">{periods.length ? periods.map(p=><div className="period-card" key={p.id}><span>{p.icon ?? '🗓️'}</span><div><b>{p.name}</b><small>{p.startDate} → {p.endDate}</small></div></div>) : <div className="empty">Ainda não existem períodos.</div>}</div></div> }

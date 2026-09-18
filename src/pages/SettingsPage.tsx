import { useRef, useState } from 'react';
import { CheckCircle2, Database, Download, Plus, Power, Upload, UserRound, X } from 'lucide-react';
import { createBackup, restoreBackup } from '../services/backupService';
import { personRepository } from '../db/repositories/personRepository';
import { useActivityStore } from '../stores/activityStore';
import { useCatalogStore } from '../stores/catalogStore';

export function SettingsPage(){
 const inputRef=useRef<HTMLInputElement>(null);
 const [message,setMessage]=useState('');
 const [newPersonName,setNewPersonName]=useState('');
 const [personError,setPersonError]=useState('');
 const [addingPerson,setAddingPerson]=useState(false);
 const reload=useActivityStore(s=>s.load);
 const reloadCatalog=useCatalogStore(s=>s.load);
 const people=useCatalogStore(s=>s.people);

 const exportData=async()=>{
  const data=await createBackup();
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`weekflow-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  setMessage('Backup exportado com sucesso.');
 };

 const importData=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  const file=e.target.files?.[0];
  if(!file)return;
  try{
   const data=JSON.parse(await file.text());
   await restoreBackup(data);
   await reload();
   await reloadCatalog();
   setMessage('Backup restaurado. Os dados locais foram substituídos.');
  }catch(err){
   setMessage(err instanceof Error?err.message:'Não foi possível importar o backup.');
  }
  e.target.value='';
 };

 const addPerson=async()=>{
  const name=newPersonName.trim();
  if(!name){setPersonError('Indica o nome da pessoa.');return;}
  if(people.some(p=>p.name.trim().toLocaleLowerCase('pt-PT')===name.toLocaleLowerCase('pt-PT'))){
   setPersonError('Já existe uma pessoa com este nome.');
   return;
  }
  try{
   const now=new Date().toISOString();
   await personRepository.create({id:crypto.randomUUID(),name,active:true,createdAt:now,updatedAt:now});
   await reloadCatalog();
   setNewPersonName('');
   setAddingPerson(false);
   setPersonError('');
   setMessage(`Pessoa “${name}” adicionada.`);
  }catch(err){
   setPersonError(err instanceof Error?err.message:'Não foi possível adicionar a pessoa.');
  }
 };

 const togglePerson=async(id:string,active:boolean)=>{
  await personRepository.update(id,{active});
  await reloadCatalog();
 };



 return <div className="page">
  <div className="page-heading"><div><h1>Definições</h1><p>Configuração e segurança dos teus dados.</p></div></div>

  <section className="settings-section">
   <div className="section-heading"><div><h2>Pessoas</h2><p>Cria e gere as pessoas que podem ser associadas às atividades.</p></div><button className="primary-btn" onClick={()=>{setAddingPerson(true);setPersonError('')}}><Plus size={17}/> Adicionar pessoa</button></div>
   {addingPerson&&<div className="person-add-settings"><div className="person-add-row"><input autoFocus value={newPersonName} onChange={e=>{setNewPersonName(e.target.value);setPersonError('')}} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();void addPerson()} if(e.key==='Escape'){setAddingPerson(false);setNewPersonName('');setPersonError('')}}} placeholder="Nome da pessoa"/><button className="primary-btn" onClick={()=>void addPerson()}><Plus size={16}/> Adicionar</button><button type="button" className="icon-btn" onClick={()=>{setAddingPerson(false);setNewPersonName('');setPersonError('')}} aria-label="Cancelar"><X size={16}/></button></div>{personError&&<div className="form-error">{personError}</div>}</div>}
   {people.length===0?<div className="empty compact"><UserRound size={22}/><p>Ainda não existem pessoas.</p><small>Adiciona aqui as pessoas da família, para depois as associares às atividades.</small></div>:<div className="catalog-list people-list">{people.map(p=><div className={`catalog-row ${!p.active?'inactive':''}`} key={p.id}><span className="catalog-icon">{p.icon??'👤'}</span><div><b>{p.name}</b><small>{p.active?'Ativa':'Inativa'}</small></div><span className="spacer"/><button className="secondary-btn compact-btn" onClick={()=>void togglePerson(p.id,!p.active)}><Power size={15}/>{p.active?'Desativar':'Ativar'}</button></div>)}</div>}
  </section>

  <div className="settings-card"><div><b><Database size={18}/> Dados locais</b><small>O WeekFlow V1 guarda tudo neste dispositivo e funciona offline.</small></div><div className="setting-value">IndexedDB</div></div>
  <div className="settings-card"><div><b>Backup</b><small>Exporta uma cópia JSON ou restaura uma cópia anterior.</small></div><div className="settings-actions"><button className="secondary-btn" onClick={exportData}><Download size={17}/> Exportar</button><button className="secondary-btn" onClick={()=>inputRef.current?.click()}><Upload size={17}/> Importar</button><input ref={inputRef} type="file" accept="application/json,.json" hidden onChange={importData}/></div></div>
  {message&&<div className="success-banner"><CheckCircle2 size={18}/>{message}</div>}
  <div className="settings-note"><b>Próximo passo</b><p>A arquitetura está preparada para sincronização cloud futura sem alterar a interface.</p></div>
 </div>;
}

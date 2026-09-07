import { useRef, useState } from 'react';
import { Download, Upload, Database, CheckCircle2 } from 'lucide-react';
import { createBackup, restoreBackup } from '../services/backupService';
import { useActivityStore } from '../stores/activityStore';
import { useCatalogStore } from '../stores/catalogStore';

export function SettingsPage(){
 const inputRef=useRef<HTMLInputElement>(null);const [message,setMessage]=useState('');
 const reload=useActivityStore(s=>s.load);const reloadCatalog=useCatalogStore(s=>s.load);
 const exportData=async()=>{const data=await createBackup();const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`weekflow-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);setMessage('Backup exportado com sucesso.');};
 const importData=async(e:React.ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0];if(!file)return;try{const data=JSON.parse(await file.text());await restoreBackup(data);await reload();await reloadCatalog();setMessage('Backup restaurado. Os dados locais foram substituídos.');}catch(err){setMessage(err instanceof Error?err.message:'Não foi possível importar o backup.');}e.target.value='';};
 return <div className="page"><div className="page-heading"><div><h1>Definições</h1><p>Configuração e segurança dos teus dados.</p></div></div><div className="settings-card"><div><b><Database size={18}/> Dados locais</b><small>O WeekFlow V1 guarda tudo neste dispositivo e funciona offline.</small></div><div className="setting-value">IndexedDB</div></div><div className="settings-card"><div><b>Backup</b><small>Exporta uma cópia JSON ou restaura uma cópia anterior.</small></div><div className="settings-actions"><button className="secondary-btn" onClick={exportData}><Download size={17}/> Exportar</button><button className="secondary-btn" onClick={()=>inputRef.current?.click()}><Upload size={17}/> Importar</button><input ref={inputRef} type="file" accept="application/json,.json" hidden onChange={importData}/></div></div>{message&&<div className="success-banner"><CheckCircle2 size={18}/>{message}</div>}<div className="settings-note"><b>Próximo passo</b><p>A arquitetura está preparada para sincronização cloud futura sem alterar a interface.</p></div></div>
}

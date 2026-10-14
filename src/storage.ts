import {openDB} from 'idb';
import {DB,emptyDB,validate} from './model';
const database=openDB('e-tiquet-tac-v1',1,{upgrade(db){db.createObjectStore('data');}});
export async function readKey(key:string){return (await database).get('data',key);}
export async function writeKey(key:string,value:any){return (await database).put('data',value,key);}
export async function load(){return navigator.locks.request('etiquetac-local',async()=>{const value=await readKey('current');if(value)return validate(value);const db=emptyDB();await saveLocal(db);return db;});}
export async function saveLocal(db:DB){const d=await database; const tx=d.transaction('data','readwrite');const previous=await tx.store.get('current');if(previous&&previous.revision!==db.revision)await tx.store.put(previous,'previous');await tx.store.put(db,'current');await tx.done;}
export function download(db:DB,name=`e-tiquet-tac-${new Date().toISOString().replace(/[:.]/g,'-')}.json`){const url=URL.createObjectURL(new Blob([JSON.stringify(db,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export async function readFile(handle:any){return validate(JSON.parse(await (await handle.getFile()).text()));}
export async function writeFile(handle:any,db:DB,expected:DB){const external=await readFile(handle);if(JSON.stringify(external)!==JSON.stringify(expected))throw Error('EXTERNAL_CHANGE');const writable=await handle.createWritable();try{await writable.write(JSON.stringify(db,null,2));await writable.close();}catch(e){await writable.abort().catch(()=>{});throw e;}}

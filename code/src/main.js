import './style.css';
import {createSound} from './sound.js';
import {pickTasks} from './tasks.js';
import {createMachine} from './machine.js';
import {getEntries,saveEntry,deleteEntry,preparePhoto} from './storage.js';
const $=id=>document.getElementById(id);let previous=[],selected=null,photos=[],photoJob=0,processing=false,spinning=false,saving=false,machine,diaryURLs=[];
let capsuleChoice=null;
function chooseColor(choice){
  if(spinning)return;
  capsuleChoice=capsuleChoice===choice?null:choice;
  $('choose-solo').setAttribute('aria-pressed',String(capsuleChoice==='solo'));
  $('choose-together').setAttribute('aria-pressed',String(capsuleChoice==='together'));
  $('choose-both').setAttribute('aria-pressed',String(capsuleChoice==='both'));
  $('color-hint').textContent=capsuleChoice==='both'?'Solo and shared ideas in one spin.':capsuleChoice==='solo'?'A little moment for you. Tap again for a surprise.':capsuleChoice==='together'?'A little moment to share. Tap again for a surprise.':'Pick a color, or let it surprise you.';
}
$('choose-solo').onclick=()=>chooseColor('solo');
$('choose-together').onclick=()=>chooseColor('together');
$('choose-both').onclick=()=>chooseColor('both');
const sound=createSound();
function updateSoundToggle(){ $('sound-toggle').textContent=sound.enabled?'Sound on':'Sound off'; $('sound-toggle').setAttribute('aria-pressed',String(sound.enabled)); }
$('sound-toggle').onclick=()=>{sound.toggle();updateSoundToggle();};
updateSoundToggle();
const formatDate=value=>new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}).format(value);
try{machine=createMachine($('scene'),spin);}catch(error){console.error(error);$('spin').classList.add('machine-button-fallback');const notice=document.createElement('p');notice.className='fallback';notice.textContent='The 3D machine could not load on this device. Tap the red button to reveal your tasks.';$('scene').append(notice);}
async function spin(){if(spinning)return;spinning=true;const company=capsuleChoice ?? (Math.random()<.5?'solo':'together');$('choose-solo').disabled=true;$('choose-together').disabled=true;$('choose-both').disabled=true;$('spin').disabled=true;$('again').disabled=true;$('spin-status').textContent='Mixing up a little possibility…';try{await sound.play({reduced:!machine || matchMedia('(prefers-reduced-motion: reduce)').matches});await machine?.spin(company);const choices=pickTasks(previous,Math.random,company);previous=choices.map(t=>t.id);$('tasks').replaceChildren();choices.forEach(task=>{const card=document.createElement('button');card.className='task-card '+task.company;card.innerHTML=`<span class="task-top"><span class="task-icon">${task.icon}</span><span>${task.category}</span></span><h3>${task.text}</h3><span class="task-bottom"><span>${task.duration}</span><span>Choose this ↗</span></span>`;card.addEventListener('click',()=>openTask(task));$('tasks').append(card);});$('tasks-section').hidden=false;$('spin-status').textContent='One small thing is enough. Choose what feels good.';$('tasks-section').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});$('tasks').firstElementChild.focus({preventScroll:true});}finally{spinning=false;$('choose-solo').disabled=false;$('choose-together').disabled=false;$('choose-both').disabled=false;$('spin').disabled=false;$('again').disabled=false;}}
$('spin').onclick=spin;$('again').onclick=spin;
document.querySelectorAll('dialog .close').forEach(button=>button.onclick=()=>button.closest('dialog').close());
function syncSave(){
  $('save').disabled=!$('done').checked||processing||saving;
  $('add-photo').disabled=processing||saving;
}
function renderPhotos(){
  $('photo-previews').replaceChildren();
  photos.forEach((photo,index)=>{
    const tile=document.createElement('div');tile.className='photo-tile';
    const image=document.createElement('img');image.src=photo.url;image.alt=`Attached photo ${index+1}`;
    const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.className='remove-photo';remove.setAttribute('aria-label',`Remove photo ${index+1}`);
    remove.onclick=()=>{URL.revokeObjectURL(photo.url);photos=photos.filter(item=>item!==photo);renderPhotos();$('add-photo').focus();};
    tile.append(image,remove);$('photo-previews').append(tile);
  });
}
function clearPhoto(){
  photoJob++;processing=false;photos.forEach(photo=>URL.revokeObjectURL(photo.url));photos=[];
  $('photo-previews').replaceChildren();$('photo').value='';syncSave();
}
function openTask(task){selected=task;$('entry-form').reset();clearPhoto();$('selected-task').textContent=task.text;$('recorded-time').textContent=formatDate(Date.now());$('form-status').textContent='';$('task-dialog').showModal();}
$('done').onchange=()=>{syncSave();$('recorded-time').textContent=formatDate(Date.now());};
$('add-photo').onclick=()=>$('photo').click();
async function photoChanged(event){
  const files=Array.from(event.target.files);event.target.value='';if(!files.length)return;
  const job=++photoJob;processing=true;syncSave();const errors=[];
  try{
    for(const [index,file] of files.entries()){
      if(job!==photoJob)return;
      $('form-status').textContent=`Preparing photo ${index+1} of ${files.length}…`;
      try{
        const blob=await preparePhoto(file);if(job!==photoJob)return;
        photos.push({blob,url:URL.createObjectURL(blob)});renderPhotos();
      }catch(error){errors.push(`${file.name}: ${error.message||'Unable to read this photo. Try JPEG or PNG.'}`);}
    }
    if(job===photoJob)$('form-status').textContent=errors.length?errors.join(' '):`${photos.length} ${photos.length===1?'photo':'photos'} added.`;
  }finally{if(job===photoJob){processing=false;syncSave();}}
}
$('photo').onchange=photoChanged;
$('task-dialog').addEventListener('close',()=>{if(!saving)clearPhoto();});
$('entry-form').onsubmit=async event=>{event.preventDefault();if(!$('done').checked||!selected||processing||saving)return;saving=true;syncSave();try{await saveEntry({id:crypto.randomUUID(),taskId:selected.id,task:selected.text,completed:true,timestamp:Date.now(),reflection:$('reflection').value.trim(),photos:photos.map(photo=>photo.blob)});$('task-dialog').close();clearPhoto();$('spin-status').textContent='A little good, saved. Look at you showing up for yourself ♡';await refreshDiary();}catch(error){$('form-status').textContent='Your entry could not be saved. Your browser may be out of storage or blocking it. Please try again.';}finally{saving=false;syncSave();}};
async function refreshDiary(){try{const entries=await getEntries();$('diary-count').textContent=entries.length;diaryURLs.forEach(URL.revokeObjectURL);diaryURLs=[];$('entries').replaceChildren();if(!entries.length){$('entries').innerHTML='<div class="empty"><span>✳</span><h3>Your little joys belong here.</h3><p>Spin the machine, try one small thing,<br>and save your first good moment.</p></div>';return;}for(const entry of entries){const article=document.createElement('article');article.className='entry';const meta=document.createElement('div');meta.className='entry-meta';const time=document.createElement('time');time.dateTime=new Date(entry.timestamp).toISOString();time.textContent=formatDate(entry.timestamp);const remove=document.createElement('button');remove.className='delete-entry';remove.textContent='Delete';remove.setAttribute('aria-label',`Delete entry: ${entry.task}`);remove.onclick=async()=>{if(!confirm('Delete this diary entry and its photo?'))return;try{await deleteEntry(entry.id);await refreshDiary();}catch{remove.textContent='Could not delete. Try again';}};meta.append(time,remove);const title=document.createElement('h3');title.textContent=entry.task;article.append(meta,title);if(entry.reflection){const notes=document.createElement('p');notes.textContent=entry.reflection;article.append(notes);}for(const photo of entry.photos ?? (entry.photo ? [entry.photo] : [])){const img=document.createElement('img');const url=URL.createObjectURL(photo);diaryURLs.push(url);img.src=url;img.alt='Photo saved with this good moment';img.loading='lazy';article.append(img);}$('entries').append(article);}}catch{$('entries').textContent='Your diary could not be opened. Allow browser storage and try again.';}}
$('diary-toggle').onclick=async()=>{await refreshDiary();$('diary-dialog').showModal();};refreshDiary();

import { extraTasks } from './extra-tasks.js';
import { expandedTasks } from './expanded-tasks.js';

const definitions = [
['outside','Go outside and enjoy the sun for 10 minutes','Fresh air','10 min','☀'],['read','Read for 15 minutes','Slow down','15 min','▤'],['podcast','Listen to a podcast episode','Get inspired','Your pace','♫'],['water','Drink a glass of water','Refuel','2 min','◒'],['stretch','Give your body a gentle stretch','Move a little','5 min','✧'],['breathe','Take five slow, comfortable breaths','Find calm','2 min','≈'],['song','Listen to a song you love','Little joy','5 min','♫'],['walk','Take a short, unhurried walk','Fresh air','10 min','↗'],['tea','Make a warm drink and savor it','Slow down','10 min','◡'],['window','Look out the window and notice five things','Be present','3 min','❋'],['tidy','Clear one small corner of your space','Make room','5 min','✦'],['friend','Send a kind message to someone','Connect','3 min','♡'],['draw','Doodle something just for fun','Create','5 min','✎'],['gratitude','Write down three things you appreciate','Reflect','5 min','✧'],['snack','Enjoy a nourishing snack','Refuel','10 min','◒'],['dance','Dance to one favorite song','Move a little','4 min','♫'],['rest','Rest your eyes away from screens','Slow down','5 min','☾'],['plant','Spend a moment with a plant or tree','Be present','5 min','❋'],['kind','Write one kind sentence to yourself','Self kindness','2 min','♡'],['photo','Photograph something that makes you smile','Little joy','5 min','▧'],['hands','Give your hands a gentle massage','Find calm','3 min','✧'],['list','Make a tiny list of things to look forward to','Reflect','5 min','▤'],['clouds','Watch the clouds drift for a while','Slow down','5 min','☁'],['comfort','Put on something comfortable','Self kindness','3 min','♡'],['learn','Learn one small thing that interests you','Get inspired','10 min','✦'],['memory','Revisit a photo of a happy memory','Little joy','5 min','▧'],['unplug','Enjoy ten quiet minutes without your phone','Find calm','10 min','☾'],['celebrate','Notice one thing you did well today','Self kindness','3 min','✳']
];
export const tasks = [
  ...definitions.map(([id, text, category, duration, icon]) => ({id, text, category, duration, icon})),
  ...extraTasks,
  ...expandedTasks,
].map(task => ({ ...task, company: task.company ?? (task.category === 'Connect' && !['connection-14', 'connection-16'].includes(task.id) ? 'together' : 'solo') }));
export function pickTasks(previous = [], random = Math.random, company = null) {
  const eligible = tasks.filter(task => !company || company === 'both' || task.company === company);
  const fresh = eligible.filter(task => !previous.includes(task.id));
  const pool = fresh.length >= 3 ? fresh : eligible;
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const selected = pool.slice(0, 3);
  if (company === 'both' && new Set(selected.map(task => task.company)).size === 1) {
    const other = pool.find(task => task.company !== selected[0].company);
    if (other) selected[2] = other;
  }
  return selected;
}

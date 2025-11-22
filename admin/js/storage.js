const DB_KEYS = {
events: 'ace_events',
users: 'ace_users',
anns: 'ace_anns',
promos: 'ace_promos',
notifs: 'ace_notifs'
}


function read(key){ try{ return JSON.parse(localStorage.getItem(key)) }catch(e){return null} }
function write(key,val){ localStorage.setItem(key, JSON.stringify(val)) }
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7) }


function seed(){
if(!read(DB_KEYS.users)) write(DB_KEYS.users, [
{id: uid(), name: 'Alice Johnson', email: 'alice@example.com', role: 'user'},
{id: uid(), name: 'Bob Smith', email: 'bob@example.com', role: 'user'},
{id: uid(), name: 'City Admin', email: 'admin@city.gov', role: 'admin'}
])
if(!read(DB_KEYS.events)) write(DB_KEYS.events, [
{id: uid(), title: 'Accessible Arts Day', date: '2025-12-05', desc: 'A day of inclusive arts', access: 'ramps, audio descriptions'}
])
if(!read(DB_KEYS.anns)) write(DB_KEYS.anns, [])
if(!read(DB_KEYS.promos)) write(DB_KEYS.promos, [])
if(!read(DB_KEYS.notifs)) write(DB_KEYS.notifs, [])
}


// expose
window.__ACEDB = { read, write, uid, seed, DB_KEYS }
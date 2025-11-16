export const STORAGE_KEY = 'shoppingLists_v1'


export function loadLists(){
try{
const raw = localStorage.getItem(STORAGE_KEY)
return raw ? JSON.parse(raw) : null
}catch(e){
console.error('Failed to load lists', e)
return null
}
}
export function saveLists(lists){
try{
localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
}catch(e){
console.error('Failed to save lists', e)
}
}

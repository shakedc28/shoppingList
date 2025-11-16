import React, {useState} from 'react'
e?.preventDefault()
const trimmed = newText.trim()
if(!trimmed) return
const newItem = { id: Date.now().toString(), text: trimmed, done:false }
onUpdateList({...list, items:[...list.items, newItem]})
setNewText('')
}


function toggleItem(id){
const items = list.items.map(it => it.id===id? {...it, done:!it.done} : it)
onUpdateList({...list, items})
}
function deleteItem(id){
const items = list.items.filter(it=>it.id!==id)
onUpdateList({...list, items})
}


return (
<div>
<div className="card">
<div className="meta">
<div>
<div className="list-title">{list.title}</div>
<div className="small-muted">{list.items.length} items</div>
</div>
<div>
<button className="btn ghost" onClick={() => onRemoveList(list.id)}>Delete list</button>
</div>
</div>


<div>
{list.items.length===0 ? (
<div className="empty">No items yet — add one below.</div>
) : (
list.items.map(it => (
<Item key={it.id} item={it} onToggle={toggleItem} onDelete={deleteItem} />
))
)}
</div>


<form onSubmit={addItem} className="footer">
<input className="input" placeholder="Add item..." value={newText} onChange={e=>setNewText(e.target.value)} />
<button className="btn">Add</button>
</form>
</div>
</div>
)
}

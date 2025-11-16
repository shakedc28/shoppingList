import React, {useEffect, useState} from 'react'
if(activeListId===id) setActiveListId(null)
}


function openList(id){ setActiveListId(id) }


function updateList(updated){
setLists(prev => prev.map(l=> l.id===updated.id ? updated : l))
}


const visible = lists.filter(l => l.title.toLowerCase().includes(query.toLowerCase()))
const active = lists.find(l=>l.id===activeListId)


return (
<div className="app-shell">
<div className="header">
<div className="brand">
<div className="logo">SL</div>
<div>
<div className="title">Shopping Lists</div>
<div className="subtitle">Organize multiple lists — responsive & fast</div>
</div>
</div>


<div className="controls">
<input className="input" placeholder="Search lists..." value={query} onChange={e=>setQuery(e.target.value)} />
<form onSubmit={addList} style={{display:'flex', gap:8}}>
<input className="input" placeholder="New list title" value={newTitle} onChange={e=>setNewTitle(e.target.value)} />
<button className="btn">New list</button>
</form>
</div>
</div>


<div style={{display:'flex',gap:16}}>
<div style={{flex:1}}>
<div className="grid">
{visible.length===0 ? (
<div className="empty">No lists found. Create one using the form above.</div>
) : (
visible.map(l => (
<ListCard key={l.id} list={l} onOpen={openList} />
))
)}
</div>
</div>


<div style={{width:420}}>
{active ? (
<ShoppingList list={active} onUpdateList={updateList} onRemoveList={removeList} />
) : (
<div className="card">
<div className="title">Select a list to edit</div>
<div className="small-muted">Or create a new list to get started.</div>
</div>
)}
</div>
</div>


</div>
)
}

import React from 'react'


export default function ListCard({list, onOpen}){
return (
<div className="card" style={{cursor:'pointer'}} onClick={() => onOpen(list.id)}>
<div className="meta">
<div>
<div className="list-title">{list.title}</div>
<div className="small-muted">{list.items.length} items</div>
</div>
<div className="small-muted">Open</div>
</div>
<div style={{marginTop:8}} className="small-muted">Click to open and edit this list.</div>
</div>
)
}

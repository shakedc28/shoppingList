import React from 'react'


export default function Item({item, onToggle, onDelete}){
return (
<div className="item-row">
<label className="checkbox">
<input type="checkbox" checked={item.done} onChange={() => onToggle(item.id)} />
</label>
<div className={`item-text ${item.done? 'done' : ''}`}>{item.text}</div>
<div className="actions">
<button className="delete" title="Delete" onClick={() => onDelete(item.id)}>✕</button>
</div>
</div>
)
}

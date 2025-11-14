import React from 'react';

const ItemList = ({ items, onToggleResolved, onDeleteItem }) => {
  if (items.length === 0) {
    return <div className="items-list empty">No items yet</div>;
  }

  return (
    <ul className="items-list">
      {items.map(item => (
        <li key={item.id} className={`item ${item.resolved ? 'resolved' : 'unresolved'}`}>
          <div className="item-content">
            <input
              type="checkbox"
              checked={item.resolved}
              onChange={() => onToggleResolved(item.id)}
              className="item-checkbox"
              aria-label={`Mark "${item.title}" as ${item.resolved ? 'unresolved' : 'resolved'}`}
            />
            <span className="item-title">{item.title}</span>
          </div>
          <button
            onClick={() => onDeleteItem(item.id)}
            className="btn btn-delete-item"
            title="Delete item"
            aria-label={`Delete "${item.title}"`}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;

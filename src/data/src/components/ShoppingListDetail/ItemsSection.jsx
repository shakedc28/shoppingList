import React from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';

const ItemsSection = ({
  items,
  showResolved,
  onToggleFilter,
  onAddItem,
  onToggleResolved,
  onDeleteItem
}) => {
  const resolvedCount = items.filter(item => item.resolved).length;
  const totalCount = items.length;

  return (
    <div className="items-section">
      <div className="section-header">
        <h2>Items</h2>
        <div className="items-stats">
          <span className="resolved-count">
            {resolvedCount}/{totalCount} resolved
          </span>
          <button 
            onClick={onToggleFilter}
            className={`btn btn-filter ${showResolved ? 'active' : 'inactive'}`}
          >
            {showResolved ? 'Hide Resolved' : 'Show Resolved'}
          </button>
        </div>
      </div>

      <ItemList
        items={items}
        onToggleResolved={onToggleResolved}
        onDeleteItem={onDeleteItem}
      />

      <AddItemForm onSubmit={onAddItem} />
    </div>
  );
};

export default ItemsSection;

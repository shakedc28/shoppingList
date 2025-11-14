import React, { useState } from 'react';

const ListDetailHeader = ({ 
  listName, 
  isOwner, 
  onNameChange, 
  onDelete,
  updatedAt 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(listName);

  const handleSave = () => {
    if (editedName.trim()) {
      onNameChange(editedName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(listName);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="list-detail-header">
      <div className="header-title">
        {isEditing && isOwner ? (
          <div className="edit-name-container">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              className="edit-name-input"
            />
            <button onClick={handleSave} className="btn btn-save">Save</button>
            <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
          </div>
        ) : (
          <div className="title-display">
            <h1>{listName}</h1>
            {isOwner && (
              <button 
                onClick={() => setIsEditing(true)}
                className="btn btn-edit"
                title="Edit list name"
              >
                ✎
              </button>
            )}
          </div>
        )}
      </div>

      <div className="header-meta">
        <span className="last-updated">Updated: {formattedDate}</span>
        {isOwner && (
          <button 
            onClick={onDelete}
            className="btn btn-delete"
            title="Delete this list"
          >
            Delete List
          </button>
        )}
      </div>
    </div>
  );
};

export default ListDetailHeader;

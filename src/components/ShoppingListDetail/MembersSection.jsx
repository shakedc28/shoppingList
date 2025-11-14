import React, { useState } from 'react';
import MembersList from './MembersList';

const MembersSection = ({
  members,
  owner,
  currentUserId,
  isOwner,
  onAddMember,
  onRemoveMember,
  onLeaveList
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onAddMember(emailInput);
      setEmailInput('');
      setShowAddForm(false);
    }
  };

  const isCurrentUserMember = members.some(m => m.id === currentUserId);

  return (
    <div className="members-section">
      <div className="section-header">
        <h2>Members</h2>
        <span className="member-count">{members.length}</span>
      </div>

      <MembersList
        members={members}
        owner={owner}
        currentUserId={currentUserId}
        isOwner={isOwner}
        onRemove={onRemoveMember}
      />

      <div className="members-actions">
        {isOwner && (
          <>
            {showAddForm ? (
              <form className="add-member-form" onSubmit={handleAddMember}>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="member@example.com"
                  className="add-member-input"
                  autoFocus
                />
                <button type="submit" className="btn btn-add">Add</button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-add-member"
              >
                + Add Member
              </button>
            )}
          </>
        )}

        {isCurrentUserMember && !isOwner && (
          <button
            onClick={onLeaveList}
            className="btn btn-leave"
          >
            Leave List
          </button>
        )}
      </div>
    </div>
  );
};

export default MembersSection;

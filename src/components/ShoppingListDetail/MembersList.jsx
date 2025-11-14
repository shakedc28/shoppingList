import React from 'react';

const MembersList = ({ 
  members, 
  owner, 
  currentUserId, 
  isOwner, 
  onRemove 
}) => {
  return (
    <ul className="members-list">
      {members.map(member => (
        <li key={member.id} className="member">
          <div className="member-info">
            <span className="member-name">
              {member.name}
              {member.id === owner.id && <span className="owner-badge"> (Owner)</span>}
              {member.id === currentUserId && <span className="you-badge"> (You)</span>}
            </span>
            <span className="member-email">{member.email}</span>
          </div>
          
          {isOwner && member.id !== owner.id && (
            <button
              onClick={() => onRemove(member.id)}
              className="btn btn-remove-member"
              title="Remove member"
            >
              ✕
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MembersList;

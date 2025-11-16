import React, { useState } from "react";

export default function MemberList({ members, owner, currentUser, onAddMember, onRemoveMember, onLeave }){
  const [draftName, setDraftName] = useState("");

  return (
    <div>
      <div style={{ marginBottom:8 }}>
        {members.map(m => (
          <div key={m} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, padding:6 }}>
            <div>
              {m} {m === owner ? <em style={{ color: "#666", fontSize:13 }}>(owner)</em> : null}
            </div>
            <div>
              {m === currentUser ? (
                <button onClick={onLeave}>Leave</button>
              ) : owner === currentUser ? (
                <button onClick={() => onRemoveMember(m)} style={{ color: "#b00" }}>Remove</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {owner === currentUser ? (
        <div style={{ marginTop:10 }}>
          <input placeholder="Add member name" value={draftName} onChange={e=>setDraftName(e.target.value)} />
          <button onClick={() => { if (draftName.trim()){ onAddMember(draftName.trim()); setDraftName(""); }}}>Add</button>
        </div>
      ) : null}
    </div>
  );
}

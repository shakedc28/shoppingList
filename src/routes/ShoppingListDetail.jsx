import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemRow from "../shared/ItemRow";
import MemberList from "../shared/MemberList";

/*
  Requirement: store data about the shopping list in a constant at the route level.
  We'll use a lookup keyed by ID for two sample lists.
*/
const LISTS_BY_ID = {
  "1": {
    id: "1",
    title: "Groceries",
    owner: "alice",      // owner username
    members: ["alice", "bob", "cara"],
    items: [
      { id: "i1", text: "Milk", done: false },
      { id: "i2", text: "Eggs", done: true },
      { id: "i3", text: "Bread", done: false }
    ]
  },
  "2": {
    id: "2",
    title: "Hardware Store",
    owner: "bob",
    members: ["bob"],
    items: [
      { id: "h1", text: "Nails", done: false },
      { id: "h2", text: "Screwdriver", done: false }
    ]
  }
};

const LOCALSTORAGE_PREFIX = "shoppinglist_assign_v1_";

/* Simulated current user (in real app you'd use auth) */
const CURRENT_USER = "alice";

export default function ShoppingListDetail(){
  const { id } = useParams();
  const navigate = useNavigate();

  // seed from constant OR localStorage
  const initialFromConstant = LISTS_BY_ID[id] ?? null;
  const [list, setList] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCALSTORAGE_PREFIX + id);
      return stored ? JSON.parse(stored) : initialFromConstant;
    } catch (e) { return initialFromConstant; }
  });

  useEffect(() => {
    if (!list && !initialFromConstant) {
      // no list found - go home
      navigate("/");
      return;
    }
    // persist changes
    localStorage.setItem(LOCALSTORAGE_PREFIX + id, JSON.stringify(list));
  }, [list, id, initialFromConstant, navigate]);

  // Early return while loading / if missing
  if (!list) return <div>Loading...</div>;

  // Handlers
  function updateTitle(newTitle){
    if (list.owner !== CURRENT_USER) return;
    setList(prev => ({ ...prev, title: newTitle }));
  }

  function addMember(name){
    if (!name) return;
    if (list.members.includes(name)) return;
    setList(prev => ({ ...prev, members: [...prev.members, name] }));
  }

  function removeMember(name){
    setList(prev => ({ ...prev, members: prev.members.filter(m => m !== name) }));
    // If current user removed themselves, navigate away
    if (name === CURRENT_USER) navigate("/");
  }

  function leaveList(){
    removeMember(CURRENT_USER);
  }

  function addItem(text){
    const t = (text || "").trim();
    if (!t) return;
    const newItem = { id: Date.now().toString(), text: t, done: false };
    setList(prev => ({ ...prev, items: [...prev.items, newItem] }));
  }

  function removeItem(itemId){
    setList(prev => ({ ...prev, items: prev.items.filter(it => it.id !== itemId) }));
  }

  function toggleItem(itemId){
    setList(prev => ({
      ...prev,
      items: prev.items.map(it => it.id === itemId ? { ...it, done: !it.done } : it)
    }));
  }

  // filtering
  const [filter, setFilter] = useState("all"); // all | unresolved | resolved
  const visibleItems = list.items.filter(it => {
    if (filter === "all") return true;
    if (filter === "unresolved") return !it.done;
    if (filter === "resolved") return it.done;
    return true;
  });

  // local component state for forms
  const [newMember, setNewMember] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(list.title);

  return (
    <div style={{ maxWidth: 980 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div>
          {!editingTitle ? (
            <>
              <h2 style={{ margin: 0 }}>{list.title}</h2>
              <div style={{ color:"#666", fontSize: 13 }}>Owner: {list.owner}</div>
            </>
          ) : (
            <div>
              <input value={titleDraft} onChange={e=>setTitleDraft(e.target.value)} />
              <button onClick={()=>{ updateTitle(titleDraft); setEditingTitle(false); }}>Save</button>
              <button onClick={()=>{ setTitleDraft(list.title); setEditingTitle(false); }}>Cancel</button>
            </div>
          )}
        </div>

        <div>
          {list.owner === CURRENT_USER ? (
            <button onClick={()=>setEditingTitle(true)}>Edit name</button>
          ) : null}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
        <div>
          <section style={{ marginBottom: 16 }}>
            <h3 style={{ marginTop:0 }}>Items</h3>

            <div style={{ display:"flex", gap:8, marginBottom: 8 }}>
              <input placeholder="Add item..." value={newItemText} onChange={e=>setNewItemText(e.target.value)} />
              <button onClick={()=>{ addItem(newItemText); setNewItemText(""); }}>Add</button>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label>
                <input type="radio" checked={filter==="all"} onChange={()=>setFilter("all")} /> All
              </label>{" "}
              <label>
                <input type="radio" checked={filter==="unresolved"} onChange={()=>setFilter("unresolved")} /> Unresolved
              </label>{" "}
              <label>
                <input type="radio" checked={filter==="resolved"} onChange={()=>setFilter("resolved")} /> Resolved
              </label>
            </div>

            <div style={{ border: "1px solid #eee", borderRadius:8, padding:8 }}>
              {visibleItems.length === 0 ? (
                <div style={{ padding: 12, color: "#777" }}>No items.</div>
              ) : (
                visibleItems.map(it => (
                  <ItemRow key={it.id} item={it} onToggle={toggleItem} onDelete={removeItem} />
                ))
              )}
            </div>
          </section>

          <section>
            <h3>Share / Members</h3>
            <MemberList
              members={list.members}
              owner={list.owner}
              currentUser={CURRENT_USER}
              onAddMember={addMember}
              onRemoveMember={removeMember}
              onLeave={leaveList}
            />
          </section>
        </div>

        <aside>
          <div style={{ padding:12, border:"1px solid #eee", borderRadius:8 }}>
            <div style={{ fontWeight:600, marginBottom:8 }}>List details</div>
            <div><strong>ID:</strong> {list.id}</div>
            <div><strong>Members:</strong> {list.members.length}</div>
            <div style={{ marginTop:12 }}>
              {/* Owner-only area */}
              {list.owner === CURRENT_USER ? (
                <>
                  <div style={{ marginBottom:8, color:"#444" }}>Owner controls</div>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={()=>{ /* For assignment: owner-only remove a member? use UI in MemberList */ }}>Owner area</button>
                  </div>
                </>
              ) : (
                <div>
                  <button onClick={leaveList}>Leave list</button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

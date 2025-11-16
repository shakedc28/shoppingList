import React from "react";

export default function ItemRow({ item, onToggle, onDelete }){
  return (
    <div style={{
      display: "flex",
      gap: 12,
      padding: 8,
      alignItems: "center",
      borderBottom: "1px solid #f3f3f3"
    }}>
      <input type="checkbox" checked={item.done} onChange={() => onToggle(item.id)} />
      <div style={{ flex: 1, textDecoration: item.done ? "line-through" : "none", color: item.done ? "#777" : "#111" }}>
        {item.text}
      </div>
      <button onClick={() => onDelete(item.id)} style={{ color: "#b00" }}>Delete</button>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

/* A small sample overview. The real data is stored at the detail route level per assignment. */
const SAMPLE = [
  { id: "1", title: "Groceries" },
  { id: "2", title: "Hardware Store" }
];

export default function Home(){
  return (
    <div>
      <h2>Your lists</h2>
      <div style={{ display: "grid", gap: 8, maxWidth: 700 }}>
        {SAMPLE.map(l => (
          <div key={l.id} style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <strong>{l.title}</strong>
                <div style={{ color: "#666", fontSize: 13 }}>ID: {l.id}</div>
              </div>
              <Link to={`/lists/${l.id}`}>Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import ShoppingListDetail from "./routes/ShoppingListDetail";
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 16 }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0 }}>Shopping Lists — Assignment</h1>
          <nav style={{ marginTop: 8 }}>
            <Link to="/" style={{ marginRight: 12 }}>Home</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists/:id" element={<ShoppingListDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

🛒 Shopping List App — React Assignment

This project is a React-based Shopping List application built for an assignment.
It demonstrates routing, state management, filtering, localStorage persistence, and component architecture.

🚀 Features
1. List Overview

Displays two sample lists:

Groceries

Hardware Store

Each item links to a detail page (/lists/:id).

📄 List Detail Page

Each shopping list supports:

✅ Title Editing (Owner only)

Owner can rename the list.

Controlled input with draft state.

✅ Items

Add items

Delete items

Toggle completion

Filter:

All

Resolved

Unresolved

✅ Members

Shows owner + members

Owner can:

Add members

Remove members

Non-owner users can Leave the list.

LocalStorage Persistence

Each list is saved locally under a unique key:

shoppinglist_assign_v1_<LIST_ID>

🧱 Tech Stack

React 19

react-router-dom v7

LocalStorage for persistence

Create React App (react-scripts 5)

📁 Project Structure
src/
  App.js
  index.js
  routes/
    Home.jsx
    ShoppingListDetail.jsx
  shared/
    ItemRow.jsx
    MemberList.jsx
  index.css

▶️ Running the App
Install dependencies:
npm install

Start in development mode:
npm start

Build for production:
npm run build

📦 Deployment

The project can be deployed to GitHub Pages, Netlify, or Vercel.

Detailed instructions for GitHub Pages are included below.

👤 Author

Shopping List Assignment Project
Created as part of academic coursework.

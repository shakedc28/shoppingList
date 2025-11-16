# Shopping List – React Assignment

This project implements a full shopping list application for university homework.  
The app includes routing, list details, members management, item management, and filtering.

## 🚀 Features Implemented

### ✔ Routing
- Home page listing available shopping lists
- Detail page for a single list (`/lists/:id`)

### ✔ Shopping List Detail
- Stored initial list data in a constant (required by assignment)
- LocalStorage persistence
- Edit list name (owner only)
- Add/remove members
- A member can leave the list
- Add/remove shopping items
- Mark items as resolved (done)
- Item filtering:  
  - all  
  - unresolved  
  - resolved  

### ✔ Components
- `ItemRow` – displays a single item
- `MemberList` – displays and manages members
- `ShoppingListDetail` – main logic
- `Home` – overview of lists

### ✔ Technologies Used
- React (CRA)
- React Router DOM v7
- LocalStorage state persistence
- Functional components + hooks

## 📁 Running the Project

npm install
npm start

shell
Copy code

## 📦 Building for Submission

npm run build

csharp
Copy code

The build files will appear in the `/build` folder.  
Zip that folder and upload it as required by the assignment.

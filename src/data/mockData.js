export const mockShoppingLists = {
  '1': {
    id: '1',
    name: 'Weekly Groceries',
    owner: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    members: [
      { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
      { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com' }
    ],
    items: [
      { id: '1', title: 'Milk', resolved: false },
      { id: '2', title: 'Bread', resolved: true },
      { id: '3', title: 'Eggs', resolved: false },
      { id: '4', title: 'Butter', resolved: false }
    ],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-14')
  }
};

// Current logged-in user
export const currentUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com'
};

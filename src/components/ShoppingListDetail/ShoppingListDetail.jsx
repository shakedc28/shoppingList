import React, { useState, useEffect } from 'react';
import { mockShoppingLists, currentUser } from '../../data/mockData';
import ListDetailHeader from './ListDetailHeader';
import ItemsSection from './ItemsSection';
import MembersSection from './MembersSection';
import '../styles/ShoppingListDetail.css';

const ShoppingListDetail = ({ listId }) => {
  const [list, setList] = useState(null);
  const [showResolved, setShowResolved] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      const listData = mockShoppingLists[listId];
      setList(listData);
      setLoading(false);
    }, 300);
  }, [listId]);

  if (loading) {
    return <div className="shopping-list-detail loading">Loading...</div>;
  }

  if (!list) {
    return <div className="shopping-list-detail error">Shopping list not found</div>;
  }

  const isOwner = list.owner.id === currentUser.id;

  // Handle name change
  const handleNameChange = (newName) => {
    setList(prev => ({
      ...prev,
      name: newName,
      updatedAt: new Date()
    }));
  };

  // Handle delete list
  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      console.log('List deleted:', list.id);
      // Navigate back or handle deletion
    }
  };

  // Handle add item
  const handleAddItem = (itemTitle) => {
    const newItem = {
      id: Date.now().toString(),
      title: itemTitle,
      resolved: false
    };
    setList(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      updatedAt: new Date()
    }));
  };

  // Handle delete item
  const handleDeleteItem = (itemId) => {
    setList(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
      updatedAt: new Date()
    }));
  };

  // Handle toggle item resolved
  const handleToggleResolved = (itemId) => {
    setList(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
      updatedAt: new Date()
    }));
  };

  // Handle toggle filter
  const handleToggleFilter = () => {
    setShowResolved(!showResolved);
  };

  // Handle add member
  const handleAddMember = (memberEmail) => {
    const newMember = {
      id: `user-${Date.now()}`,
      name: memberEmail.split('@')[0],
      email: memberEmail
    };

    if (!list.members.find(m => m.email === memberEmail)) {
      setList(prev => ({
        ...prev,
        members: [...prev.members, newMember],
        updatedAt: new Date()
      }));
    }
  };

  // Handle remove member
  const handleRemoveMember = (memberId) => {
    if (memberId === currentUser.id && !isOwner) {
      console.log('Cannot remove yourself as owner');
      return;
    }
    setList(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== memberId),
      updatedAt: new Date()
    }));
  };

  // Handle leave list
  const handleLeaveList = () => {
    if (window.confirm('Are you sure you want to leave this list?')) {
      handleRemoveMember(currentUser.id);
    }
  };

  // Filter items based on showResolved
  const filteredItems = showResolved 
    ? list.items 
    : list.items.filter(item => !item.resolved);

  return (
    <div className="shopping-list-detail">
      <ListDetailHeader
        listName={list.name}
        isOwner={isOwner}
        onNameChange={handleNameChange}
        onDelete={handleDeleteList}
        updatedAt={list.updatedAt}
      />

      <div className="detail-content">
        <ItemsSection
          items={filteredItems}
          showResolved={showResolved}
          onToggleFilter={handleToggleFilter}
          onAddItem={handleAddItem}
          onToggleResolved={handleToggleResolved}
          onDeleteItem={handleDeleteItem}
        />

        <MembersSection
          members={list.members}
          owner={list.owner}
          currentUserId={currentUser.id}
          isOwner={isOwner}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
          onLeaveList={handleLeaveList}
        />
      </div>
    </div>
  );
};

export default ShoppingListDetail;

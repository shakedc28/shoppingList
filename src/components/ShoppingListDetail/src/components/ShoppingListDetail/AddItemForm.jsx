import React, { useState } from 'react';

const AddItemForm = ({ onSubmit, placeholder = 'Add new item...' }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="add-item-input"
      />
      <button 
        type="submit"
        className="btn btn-add"
        disabled={!inputValue.trim()}
      >
        + Add
      </button>
    </form>
  );
};

export default AddItemForm;

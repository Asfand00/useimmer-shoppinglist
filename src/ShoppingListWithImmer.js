import React, { useRef } from 'react';
import { useImmer } from 'use-immer';

function ShoppingListWithImmer() {
  // Initialize state using useImmer
  const [shoppingList, setShoppingList] = useImmer([]);
  
  // State variables to manage input field values
  const [itemName, setItemName] = useImmer("");
  const [itemQuantity, setItemQuantity] = useImmer(1);
  
  // Refs for input fields
  const nameInputRef = useRef(null);
  const quantityInputRef = useRef(null);

  // Function to add a new item to the shopping list
  const addItem = () => {
    
    // Input Validation for name and quantity
    if (!itemName.trim()) {
      alert("Please enter a valid item name.");
      return;
    }
    if (!Number.isInteger(itemQuantity) || itemQuantity <= 0) {
      alert("Please enter a valid positive integer quantity.");
      return;
    }
    
    const newItem = {
      id: shoppingList.length + 1,
      name: itemName,
      quantity: itemQuantity,
      details: {
        category: "Uncategorized",
        notes: "None"
      }
    };

    setShoppingList(draft => {
      draft.push(newItem);
    });

    // Reset input field values
    setItemName("");
    setItemQuantity(1);

    // Focus on name input field
    nameInputRef.current.focus();
  };

  // Function to update an existing item in the shopping list
  const updateItem = (id, updatedItem) => {
    setShoppingList(draft => {
      const index = draft.findIndex(item => item.id === id);
      if (index !== -1) {
        draft[index] = { ...draft[index], ...updatedItem };
      }
    });
  };

  // Function to remove an item from the shopping list
  const removeItem = (id) => {
    setShoppingList(draft => {
      const index = draft.findIndex(item => item.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <div>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          ref={nameInputRef}
        />
        <input
          type="number"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(parseInt(e.target.value))}
          placeholder="Quantity"
          ref={quantityInputRef}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, { name: e.target.value })}
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) })}
            />
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListWithImmer;

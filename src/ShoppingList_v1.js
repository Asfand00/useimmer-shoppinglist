import React from 'react';
import { useImmer } from 'use-immer';

function ShoppingList_v1() {
  // Initialize state using useImmer
  const [shoppingList, setShoppingList] = useImmer([]);

  // Function to add a new item to the shopping list
  const addItem = () => {
    
    const newItem = {
      id: shoppingList.length + 1,
      name: "New Item",
      quantity: 1,
      details: {
        category: "Uncategorized",
        notes: ""
      }
    };

    setShoppingList(draft => {
      draft.push(newItem);
    });
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
      <button onClick={addItem}>Add Item</button>
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

export default ShoppingList_v1;

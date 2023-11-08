document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inventoryForm');
    form.onsubmit = addItem;

    // Load and display items from localStorage
    displayItems();
});

function addItem(event) {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemQuantity) { // Check if both fields are filled out
        const inventory = getInventory();
        inventory[itemName] = (inventory[itemName] || 0) + itemQuantity;

        localStorage.setItem('inventory', JSON.stringify(inventory));
        displayItems();
        console.log('Item added:', itemName, itemQuantity);
    } else {
        console.log('Item name or quantity missing.');
    }
}

function getInventory() {
    return JSON.parse(localStorage.getItem('inventory')) || {};
}

function displayItems() {
    const inventory = getInventory();
    const inventoryList = document.getElementById('inventoryList');

    // Clear the inventory list before displaying updated items
    while (inventoryList.firstChild) {
        inventoryList.removeChild(inventoryList.firstChild);
    }

    Object.keys(inventory).forEach(item => {
        const quantity = inventory[item];

        // Create a new div element for each inventory item
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item}: ${quantity}`;

        // Append the new div to the inventory list
        inventoryList.appendChild(itemDiv);
    });
}

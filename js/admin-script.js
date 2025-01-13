// Load items from localStorage and display them
function loadItems() {
    const items = JSON.parse(localStorage.getItem('itemsStoreTemp')) || [];
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    items.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';

        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <strong>${item.name}</strong>
                <span>${item.category} - ₹${item.price}</span>
            </div>
            <div class="item-actions">
                <button onclick="editItem(${index})">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/edit.png" alt="Edit">
                    Edit
                </button>
                <button onclick="deleteItem(${index})">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/trash.png" alt="Delete">
                    Delete
                </button>
            </div>
        `;

        itemList.appendChild(itemCard);
    });
}

// Validate form input fields
function validateForm(name, price, image) {
    let isValid = true;

    // Validate product name
    if (name.trim() === '' || name.trim().length === 0) {
        document.getElementById('name-error').textContent = 'Product name cannot be blank or spaces';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }

    // Validate price
    if (price <= 0 || price.trim() === '' || isNaN(price)) {
        document.getElementById('price-error').textContent = 'Price must be a positive number';
        document.getElementById('price-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('price-error').style.display = 'none';
    }

    // Validate image link
    if (image.trim() === '' || image.trim().length === 0) {
        document.getElementById('image-error').textContent = 'Image link cannot be blank or spaces';
        document.getElementById('image-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('image-error').style.display = 'none';
    }

    return isValid;
}

// Form submission handler
document.getElementById('item-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    if (!validateForm(name, price, image)) {

        return;
    }
    else{
        alert("item added ")
    }

    const item = { name, category, price, image };
    const items = JSON.parse(localStorage.getItem('itemsStoreTemp')) || [];
    items.push(item);
    localStorage.setItem('itemsStoreTemp', JSON.stringify(items));

    document.getElementById('item-form').reset();

    loadItems();
});

// Edit an existing item
function editItem(index) {
    const items = JSON.parse(localStorage.getItem('itemsStoreTemp')) || [];
    const item = items[index];

    document.getElementById('name').value = item.name;
    document.getElementById('category').value = item.category;
    document.getElementById('price').value = item.price;
    document.getElementById('image').value = item.image;

    deleteItem(index);
}

// Delete an existing item
function deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('itemsStoreTemp')) || [];
    items.splice(index, 1);
    localStorage.setItem('itemsStoreTemp', JSON.stringify(items));

    loadItems();
}

// Initial load of items
loadItems();

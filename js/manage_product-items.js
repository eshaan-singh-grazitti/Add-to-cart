const itemBtn = document.getElementById("item-form");
const blurDiv = document.querySelector(".blur-div");
// blurDiv.style.display = 'none'
// const formbg = document.getElementsByClassName("form-div");


// if(itemBtn.classList.includes("active")){
//     blurDiv.style.display="block";

// }
// else{
//     blurDiv.style.display="none";
// }
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
                <strong>${item.category} </strong>
                <strong> ₹${item.price}</strong>
            </div>
            <div class="item-actions"> 
                <button onclick="editItem(${index})" class="edit-button">
                <svg class="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                  
                </button>
                
                    <button onclick="deleteItem(${index})" class="Btn">
                        <div class="sign">
                        <svg viewBox="0 0 16 16" class="bi bi-trash3-fill"fill="currentColor"height="18"width="18"xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
      ></path>
    </svg>
  </div>

  <div class="text">Delete</div>
</button>

            </div>
        `;

        itemList.appendChild(itemCard);
    });
}

function validateForm(name, price) {
    return name.trim() !== '' && !isNaN(price) && price.trim() !== '' && price > 0;
}

document.getElementById('item-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    if (!validateForm(name, price)) {
        alert('Please ensure that the item name is not just whitespace and the price is a valid number.');
        return;
    }

    const item = { name, category, price, image };
    const items = JSON.parse(localStorage.getItem('itemsStoreTemp')) || [];
    items.push(item);
    localStorage.setItem('itemsStoreTemp', JSON.stringify(items));

    document.getElementById('item-form').reset();
    itemBtn.classList.remove("active");
    // formbg.classList.remove("blurr");
    blurDiv.style.display = "none";

    loadItems();
});

function editItem(index) {
    itemBtn.classList.add("active");
    blurDiv.style.display = "block";
    // formbg.classList.add("blurr");
    const items = JSON.parse(localStorage.getItem('itemsStoreTemp')) || [];
    const item = items[index];

    document.getElementById('name').value = item.name;
    document.getElementById('category').value = item.category;
    document.getElementById('price').value = item.price;
    document.getElementById('image').value = item.image;

    deleteItem(index);
}

function deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('itemsStoreTemp')) || [];
    items.splice(index, 1);
    localStorage.setItem('itemsStoreTemp', JSON.stringify(items));

    loadItems();
}

loadItems();
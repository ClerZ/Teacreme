// Your JavaScript code

const itemDetails = {
  'Avocado': {
    '16 oz': { price: 5.99, image: 'classics/cheesecake.png' },
    '22 oz': { price: 7.99, image: 'classics/cheesecake.png' }
  }
  
};

function calculateTotalPrice(flavor, size, quantity) {
  return itemDetails[flavor][size].price * quantity;
}

function addToCart(flavor, size) {
  const cartItemsContainer = document.getElementById('cartItems');
  const existingCartItem = findCartItem(flavor, size);

  if (existingCartItem) {
    existingCartItem.quantity += 1;
    updateCartItem(existingCartItem);
  } else {
    const cartItem = createCartItem(flavor, size, 1);
    cartItemsContainer.appendChild(cartItem);
  }

  saveCartToLocalStorage();
  updateTotalAmount();
}

function findCartItem(flavor, size) {
  const cartItems = document.querySelectorAll('.cart-item');
  for (const cartItem of cartItems) {
    const itemFlavor = cartItem.dataset.flavor;
    const itemSize = cartItem.dataset.size;

    if (itemFlavor === flavor && itemSize === size) {
      return cartItem;
    }
  }
  return null;
}

function createCartItem(flavor, size, quantity) {
  const cartItemContainer = document.createElement('div');
  cartItemContainer.className = 'cart-item-container';

  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.dataset.itemId = generateItemId();
  cartItem.dataset.flavor = flavor;
  cartItem.dataset.size = size; // Save the size property
  cartItem.quantity = quantity;

  const totalPrice = calculateTotalPrice(flavor, size, quantity);

  const flavorImage = document.createElement('img');
  flavorImage.src = itemDetails[flavor][size].image;
  flavorImage.alt = flavor;
  flavorImage.className = 'cart-item-image';

  const cartItemText = document.createElement('p');
  cartItemText.className = 'cart-item-text';
  cartItemText.textContent = `${flavor} - ${size} - ${quantity} - ₱ ${totalPrice.toFixed(2)}`;

  const quantityContainer = document.createElement('div');
  quantityContainer.className = 'quantity-container';

  const minusButton = document.createElement('span');
  minusButton.className = 'quantity-button';
  minusButton.textContent = '-';
  minusButton.addEventListener('click', function () {
    updateQuantity(cartItem, -1);
  });

  const plusButton = document.createElement('span');
  plusButton.className = 'quantity-button';
  plusButton.textContent = '+';
  plusButton.addEventListener('click', function () {
    updateQuantity(cartItem, 1);
  });

  const quantityTextbox = document.createElement('input');
  quantityTextbox.type = 'number';
  quantityTextbox.className = 'quantity-textbox';
  quantityTextbox.value = quantity;
  quantityTextbox.min = 0;
  quantityTextbox.step = 1;
  quantityTextbox.addEventListener('input', function () {
    updateQuantity(cartItem, 0);
  });

  quantityContainer.appendChild(minusButton);
  quantityContainer.appendChild(quantityTextbox);
  quantityContainer.appendChild(plusButton);

  const deleteButton = document.createElement('span');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteCartItem(cartItem);
  });

  cartItem.appendChild(flavorImage);
  cartItem.appendChild(cartItemText);
  cartItem.appendChild(quantityContainer);
  cartItem.appendChild(deleteButton);

  cartItemContainer.appendChild(cartItem);

  return cartItemContainer;
}

function generateItemId() {
  return `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function updateQuantity(cartItem, change) {
  const newQuantity = cartItem.quantity + change;

  if (newQuantity <= 0 || isNaN(newQuantity)) {
    deleteCartItem(cartItem);
  } else {
    cartItem.quantity = newQuantity;
    updateCartItem(cartItem);
    updateTotalAmount();
    saveCartToLocalStorage();
  }
}

function deleteCartItem(cartItem) {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.removeChild(cartItem.parentNode);
  updateTotalAmount();
  saveCartToLocalStorage();
}

//CLERWIN
function saveCartToLocalStorage() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartData = [];

  cartItems.forEach(cartItem => {
    const itemId = cartItem.dataset.itemId; // Use the unique itemId
    const flavor = cartItem.dataset.flavor;
    const size = cartItem.dataset.size;
    const quantity = cartItem.quantity;

    cartData.push({ itemId, flavor, size, quantity });
  });

  localStorage.setItem('cart', JSON.stringify(cartData));
}

document.addEventListener('DOMContentLoaded', function () {
  loadCartFromLocalStorage();
  updateTotalAmount();
});

function loadCartFromLocalStorage() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartDataJSON = localStorage.getItem('cart');
  const cartData = JSON.parse(cartDataJSON) || [];

  // Clear existing items before loading from local storage
  cartItemsContainer.innerHTML = '';

  // Variable to keep track of the number of items loaded
  let itemsLoaded = 0;

  cartData.forEach(item => {
    const { itemId, flavor, size, quantity } = item;
    const cartItem = createCartItem(flavor, size, quantity);

    // Wait for the image to load before appending the item to the cart
    cartItem.querySelector('.cart-item-image').onload = function () {
      cartItem.dataset.itemId = itemId;
      cartItemsContainer.appendChild(cartItem);
      updateCartItem(cartItem);

      // Increment the counter and check if all items are loaded
      itemsLoaded++;
      if (itemsLoaded === cartData.length) {
        updateTotalAmount(); // Recalculate the total amount after loading all items
      }
    };
  });
}


function updateCartItem(cartItem) {
  const flavor = cartItem.dataset.flavor;
  const size = cartItem.dataset.size;
  const quantity = cartItem.quantity;
  const totalPrice = calculateTotalPrice(flavor, size, quantity);

  const cartItemText = cartItem.querySelector('.cart-item-text');
  cartItemText.textContent = `${flavor} - ${size} - ${quantity} - ₱ ${totalPrice.toFixed(2)}`;
}

function updateTotalAmount() {
  const cartItems = document.querySelectorAll('.cart-item');
  let totalAmount = 0;

  cartItems.forEach(cartItem => {
    const flavor = cartItem.dataset.flavor;
    const size = cartItem.dataset.size;
    const quantity = cartItem.quantity;

    totalAmount += calculateTotalPrice(flavor, size, quantity);
  });

  document.getElementById('yourTotalAmountElement').textContent = `Total: ₱ ${totalAmount.toFixed(2)}`;
}

const flavorContainer = document.querySelector('.new-flavor-container1');
flavorContainer.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    const flavor = flavorContainer.querySelector('.txtformat').textContent;
    const size = event.target.dataset.size;
    addToCart(flavor, size);
    updateTotalAmount();
    messageAddToCart();
  }
});

const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', function () {
  alert('Checkout button clicked! Implement your checkout logic.');
});

function messageAddToCart() {
  const cartMessage = document.getElementById('cartMessage');
  cartMessage.classList.remove('hidden');
  setTimeout(() => {
    cartMessage.classList.add('hidden');
  }, 2000);
}



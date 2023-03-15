/* fetch('items.csv')
  .then(response => response.text())
  .then(data => {
    const items = Papa.parse(data, { header: true }).data;
    console.log(items);

    const fishItems = items.filter(item => item.category === 'Fish');
    const chickenItems = items.filter(item => item.category === 'Chicken');

    const fishContainer = document.getElementById('fish-items');
    fishItems.forEach(item => {
      const html = renderItem(item);
      fishContainer.innerHTML += html;
    });

    const chickenContainer = document.getElementById('chicken-items');
    chickenItems.forEach(item => {
      const html = renderItem(item);
      chickenContainer.innerHTML += html;
    });

    const cartItems = [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        cartItems.push(items[index]);
        renderCartItems();
      });
    });

    const renderCartItems = () => {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = '';

      cartItems.forEach(item => {
        const html = `<li>${item.name} - ${item.price}</li>`;
        cartItemsContainer.innerHTML += html;
      });

      renderCartTotal();
    };

    const renderCartTotal = () => {
      const cartTotalContainer = document.getElementById('cart-total');
      const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
      cartTotalContainer.innerHTML = `Total: ${total}`;
    };

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
      let message = 'Hi, I would like to order the following items: \n\n';
      cartItems.forEach(item => {
        message += `${item.name} - ${item.price}\n`;
      });
      message += `\nTotal: ${cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0)}`;

      const url = `https://wa.me/whatsappphonenumber?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  });

function renderItem(item) {
  return `
    <div class="item">
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button class="add-to-cart-button">Add to cart</button>
    </div>
  `;
}

*/
// Load items from CSV file
fetch('items.csv')
  .then(response => response.text())
  .then(data => {
    const items = Papa.parse(data, { header: true }).data;

    const fishItems = items.filter(item => item.category === 'Fish');
    const chickenItems = items.filter(item => item.category === 'Chicken');

    const fishContainer = document.getElementById('fish-items');
    fishItems.forEach(item => {
      const html = renderItem(item);
      fishContainer.innerHTML += html;
    });

    const chickenContainer = document.getElementById('chicken-items');
    chickenItems.forEach(item => {
      const html = renderItem(item);
      chickenContainer.innerHTML += html;
    });

    // Add event listener to Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', event => {
        const itemContainer = event.target.parentNode;
        const itemName = itemContainer.querySelector('.item-name').textContent;
        const itemPrice = itemContainer.querySelector('.item-price').textContent;

        addItemToCart(itemName, itemPrice);
      });
    });
  });

function renderItem(item) {
  return `
    <div class="item">
      <img src="${item.image}">
      <h3 class="item-name">${item.name}</h3>
      <p class="item-price">${item.price}</p>
      <button class="add-to-cart-button">Add to Cart</button>
    </div>
  `;
}

// Add item to cart
function addItemToCart(itemName, itemPrice) {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const newItem = document.createElement('li');
  newItem.textContent = `${itemName} - ${itemPrice}`;
  cartItems.appendChild(newItem);

  // Update cart total
  const itemsInCart = cartItems.children.length;
  const total = calculateCartTotal(cartItems);
  cartTotal.textContent = `Total (${itemsInCart} items): ${total}`;
}

// Calculate cart total
function calculateCartTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.children.length; i++) {
    const item = cartItems.children[i].textContent;
    const itemPrice = parseFloat(item.split(' - ')[1]);
    total += itemPrice;
  }
  return total.toFixed(2);
}

/*
// Checkout function
function checkout() {
  const cartItems = document.getElementById('cart-items');
  const total = calculateCartTotal(cartItems);
  const message = `Hi, I would like to order the following items:
${cartItems.textContent}
Total: ${total}`;

  // Open WhatsApp chat with message
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/9607040169?text=${encodedMessage}`;
  window.location.replace(url);
}

// Add event listener to Checkout button
const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', checkout);
*/

// Define a function to handle checkout
function checkout() {
  // Get the list of cart items as a string
  const cartItemNames = cartItems.map(item => item.name).join(', ');
  // Construct the WhatsApp message
  const message = 'I would like to purchase the following items from your store: ' + cartItemNames;
  // Construct the WhatsApp URL
  const whatsappUrl = 'https://wa.me/9607040169?text=' + encodeURIComponent(message);
  // Redirect to the WhatsApp URL
  window.location.replace(whatsappUrl);
}
// Load the menu when the page is ready
$(document).ready(() => {
  loadMenu();
  // Bind the checkout function to the checkout button
  $('#checkout-button').click(checkout);
});

const cartItems = [];

fetch('items.csv')
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

    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
      button.addEventListener('click', () => {
        const itemId = button.dataset.itemId;
        const item = items.find(item => item.id === itemId);
        cartItems.push(item);
        renderCart();
      });
    });
  });

function renderItem(item) {
  return `
    <div class="item">
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button class="add-to-cart" data-item-id="${item.id}">Add to Cart</button>
    </div>
  `;
}

function renderCart() {
  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = '';
  cartItems.forEach(item => {
    const html = `
      <li>
        <span>${item.name}</span>
        <span>${item.price}</span>
      </li>
    `;
    cartItemsList.innerHTML += html;
  });

  const cartTotal = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  const cartTotalElement = document.getElementById('cart-total');
  cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
}

const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
  alert(`Total: $${cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}`);
});


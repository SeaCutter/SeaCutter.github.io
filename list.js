const items = [];
let cartTotal = 0;

fetch('items.csv')
  .then(response => response.text())
  .then(data => {
    const itemsArray = Papa.parse(data, { header: true }).data;
    console.log(itemsArray);

    itemsArray.forEach(item => {
      items.push({
        name: item.name,
        category: item.category,
        image: item.image,
        price: parseInt(item.price),
        quantity: 0
      });
    });

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
  });

function renderItem(item) {
  return `
    <div class="item">
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
    </div>
  `;
}

const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', () => {
  let message = 'Hello, I would like to place an order:\n\n';
  let total = 0;
  items.forEach(item => {
    if (item.quantity > 0) {
      message += `${item.name} x ${item.quantity} - ${item.price * item.quantity} \n`;
      total += item.price * item.quantity;
    }
  });
  message += `\nTotal: ${total}`;
  const encodedMessage = encodeURIComponent(message);
  window.location.href = `https://wa.me/9607040169?text=${encodedMessage}`;
});

document.addEventListener('click', event => {
  if (event.target && event.target.classList.contains('add-to-cart')) {
    const name = event.target.dataset.name;
    const price = parseInt(event.target.dataset.price);
    const item = items.find(item => item.name === name);
    item.quantity++;
    cartTotal += price;
    cartTotalElement.innerHTML = `Total: ${cartTotal}`;
    cartItems.innerHTML += `
      <li>${name} x ${item.quantity} - ${price * item.quantity}</li>
    `;
  }
});


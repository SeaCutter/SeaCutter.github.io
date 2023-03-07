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


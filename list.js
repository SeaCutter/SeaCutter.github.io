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
  });

function renderItem(item) {
  return `
    <div class="item">
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
    </div>
  `;
}

const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.dataset.itemName;
    const itemPrice = button.dataset.itemPrice;
    addToCart(itemName, itemPrice);
  });
});

function addToCart(itemName, itemPrice) {
  const cartItemsList = document.getElementById('cart-items');
  const newItem = document.createElement('li');
  newItem.innerHTML = `${itemName} - ${itemPrice}`;
  cartItemsList.appendChild(newItem);
}

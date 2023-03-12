// URL for the CSV file containing the menu items
/*
const menuUrl = 'menu.csv';

// Define a variable to hold the menu data
let menuData = [];

// Define variables to hold the menu categories
let fishItems = [];
let chickenItems = [];

// Define a variable to hold the cart items
let cartItems = [];

// Define a function to load the menu items from the CSV file
function loadMenu() {
  $.get(menuUrl, function(data) {
    // Split the CSV data into rows
    const rows = data.split('\n');
    // Loop through the rows and split them into columns
    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].split(',');
      // Create an object to hold the item data
      const item = {
        name: cols[0].trim(),
        category: cols[1].trim(),
        image: cols[2].trim(),
        price: parseFloat(cols[3].trim())
      };
      // Add the item to the menu data
      menuData.push(item);
      // Add the item to the appropriate category
      if (item.category === 'fish') {
        fishItems.push(item);
      } else if (item.category === 'chicken') {
        chickenItems.push(item);
      }
    }
    // Populate the menu categories
    populateMenuCategories();
  });
}

// Define a function to populate the menu categories
function populateMenuCategories() {
  // Populate the fish category
  const fishMenu = $('#fish-menu');
  fishItems.forEach(item => {
    const listItem = $('<li></li>');
    listItem.text(item.name + ' - $' + item.price);
    const addButton = $('<button>Add to Cart</button>');
    addButton.click(() => {
      addToCart(item);
    });
    listItem.append(addButton);
    fishMenu.append(listItem);
  });
  // Populate the chicken category
  const chickenMenu = $('#chicken-menu');
  chickenItems.forEach(item => {
    const listItem = $('<li></li>');
    listItem.text(item.name + ' - $' + item.price);
    const addButton = $('<button>Add to Cart</button>');
    addButton.click(() => {
      addToCart(item);
    });
    listItem.append(addButton);
    chickenMenu.append(listItem);
  });
}

// Define a function to add an item to the cart
function addToCart(item) {
  cartItems.push(item);
  const cartList = $('#cart-items');
  const listItem = $('<li></li>');
  listItem.text(item.name + ' - $' + item.price);
  cartList.append(listItem);
}

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
*/

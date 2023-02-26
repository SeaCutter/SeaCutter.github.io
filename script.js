// URL for the CSV file containing the menu items
const menuUrl = 'https://raw.githubusercontent.com/SeaCutter/SeaCutter.github.io/main/menu.csv';

// Define a variable to hold the menu data
let menuData = [];

// Define variables to hold the menu categories
let fishItems = [];
let chickenItems = [];

// Define a variable to hold the cart items
let cartItems = [];


// Define a function to load the menu items from the CSV file
function loadMenu() {
  console.log('loadMenu called');
  $.get(menuUrl, function(data) {
    // Define a function to process the CSV data
    function processData(data) {
      var lines = data.split(/\r?\n/);
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) {
          var cols = lines[i].split(",");
          var item = {
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
      }
      // Populate the menu categories
      populateMenuCategories();
      // Log the menu data to verify if it was loaded properly
      console.log(menuData);
    }

    // Call the processData function with the CSV data
    processData(data);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('Error retrieving menu data:', textStatus, errorThrown);
  });
}



function getFishes() {
  return menuData.filter(item => item.category === 'fish');
}


// Define a function to populate the menu categories
function populateMenuCategories() {
  var categories = ['fish', 'chicken'];
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    var items = (category === 'fish') ? fishItems : chickenItems;
    var categoryContainer = $('<div class="category-container"></div>');
    var categoryTitle = $('<h2></h2>').text(category);
    categoryContainer.append(categoryTitle);
    var itemList = $('<ul></ul>');
    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      var itemHtml = '<li class="item">' +
                     '<div class="item-image">' +
                     '<img src="' + item.image + '">' +
                     '</div>' +
                     '<div class="item-details">' +
                     '<h3 class="item-name">' + item.name + '</h3>' +
                     '<div class="item-price">$' + item.price.toFixed(2) + '</div>' +
                     '</div>' +
                     '</li>';
      itemList.append(itemHtml);
    }
    categoryContainer.append(itemList);
    $('#menu-container').append(categoryContainer);
  }
}

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

export function getCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
  }

  // cart.js

async function fetchProductById(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await response.json();
  }
  
  function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  function removeFromCart(id) {
    let cart = getCartItems();
    cart = cart.filter(itemId => itemId !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // refresh to update the cart view
  }
  
  async function renderCart() {
    const cartItems = getCartItems();
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    container.innerHTML = '';
  
    if (cartItems.length === 0) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      totalEl.textContent = '0.00';
      return;
    }
  
    let total = 0;
  
    for (const id of cartItems) {
      const product = await fetchProductById(id);
      total += product.price;
  
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h4>${product.title}</h4>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <button class="btn-primary remove-from-cart" data-id="${id}">Remove</button>
      `;
      container.appendChild(card);
    }
  
    totalEl.textContent = total.toFixed(2);
  
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', renderCart);
  

  document.getElementById('checkout-btn').addEventListener('click', () => {
    const cartItems = getCartItems();
  
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before checking out.");
    } else {
      alert("✅ Checkout successful! Thank you for your purchase.");
      localStorage.removeItem('cart'); // Clear cart
      location.reload(); // Refresh page
    }
  });
  
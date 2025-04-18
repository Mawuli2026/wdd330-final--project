// modules/product.js

export async function fetchFeaturedProducts(category = null) {
  try {
    const endpoint = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : `https://fakestoreapi.com/products?limit=4`;

    const response = await fetch(endpoint);
    const products = await response.json();

    const container = document.getElementById('featured-products');
    container.innerHTML = '';

    products.forEach(product => {
      card.addEventListener('mouseover', () => {
        card.style.backgroundColor = '#fff7f3';
      });
      card.addEventListener('mouseout', () => {
        card.style.backgroundColor = '#fff';
      });
      
      const card = document.createElement('div');
      card.classList.add('product-card');

      // ✅ PASTE THIS INNERHTML CODE RIGHT HERE:
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h4>${product.title}</h4>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Rating:</strong> ${product.rating.rate} ⭐ (${product.rating.count} reviews)</p>
        <p class="description">${product.description}</p>
        <button class="btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;

      container.appendChild(card);
    });

    attachEventListeners();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function attachEventListeners() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      alert(`Product ${id} added to cart!`);
    });
  });
}


function attachEventListeners() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');

      // Save to cart in localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
      } else {
        alert('Product already in cart!');
      }
    });
  });
}

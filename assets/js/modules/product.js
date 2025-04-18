export async function fetchFeaturedProducts(query = 'gucci') {
  const apiKey = '985f5fb336msh911097c9b937b61p11e1b8jsn35f70b7f9caf';
  const url = `https://fragrancefinder-api.p.rapidapi.com/search?keyword=${query}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'fragrancefinder-api.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    });

    const data = await response.json();
    const products = data?.results || [];

    const container = document.getElementById('featured-products');
    container.innerHTML = '';

    if (!products.length) {
      container.innerHTML = '<p>No fragrances found.</p>';
      return;
    }

    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.fragrance_name}" />
        <h4>${product.fragrance_name}</h4>
        <p><strong>Brand:</strong> ${product.brand_name}</p>
        <p><strong>Scent Family:</strong> ${product.scent_family || 'N/A'}</p>
        <p><strong>Top Notes:</strong> ${product.top_notes || 'N/A'}</p>
        <p><strong>Base Notes:</strong> ${product.base_notes || 'N/A'}</p>
        <button class="btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;

      container.appendChild(card);
    });

    attachEventListeners();
  } catch (error) {
    console.error('Error fetching fragrances:', error);
  }
}

function attachEventListeners() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Fragrance added to cart!');
      } else {
        alert('Fragrance already in cart!');
      }
    });
  });
}


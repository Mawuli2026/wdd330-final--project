// main.js
import { fetchFeaturedProducts } from './modules/product.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchFeaturedProducts();
});


import { fetchAndFilterProducts } from './modules/search.js';

document.getElementById('search-input').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  fetchAndFilterProducts(term);
});


const filterButtons = document.querySelectorAll('.category-filters button');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    fetchFeaturedProducts(category);
  });
});


const apiUrl = 'https://fragrancefinder-api.p.rapidapi.com/search?keyword=chanel';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'fragrancefinder-api.p.rapidapi.com',
    'x-rapidapi-key': '985f5fb336msh911097c9b937b61p11e1b8jsn35f70b7f9caf'
  }
};

fetch(apiUrl, options)
  .then(response => response.json())
  .then(data => {
    const fragranceList = data?.results || []; // check if results exist
    const container = document.getElementById('fragrance-results');

    fragranceList.forEach(frag => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${frag.image}" alt="${frag.fragrance_name}" />
        <h4>${frag.fragrance_name}</h4>
        <p><strong>Brand:</strong> ${frag.brand_name}</p>
        <p><strong>Scent Family:</strong> ${frag.scent_family}</p>
        <p><strong>Top Notes:</strong> ${frag.top_notes}</p>
        <p><strong>Base Notes:</strong> ${frag.base_notes}</p>
        <button class="btn-primary add-to-cart">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching fragrance data:', error);
  });


  const container = document.getElementById('fragrance-results');
const searchInput = document.getElementById('search-input');
const brandSelect = document.getElementById('brand-select');

const apiKey = '985f5fb336msh911097c9b937b61p11e1b8jsn35f70b7f9caf';

function fetchFragrances(query = 'chanel') {
  const url = `https://fragrancefinder-api.p.rapidapi.com/search?keyword=${query}`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'fragrancefinder-api.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  })
    .then(res => res.json())
    .then(data => {
      container.innerHTML = ''; // clear old results
      const fragrances = data?.results || [];
      
      if (fragrances.length === 0) {
        container.innerHTML = `<p>No results found.</p>`;
        return;
      }

      fragrances.forEach(frag => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${frag.image}" alt="${frag.fragrance_name}" />
          <h4>${frag.fragrance_name}</h4>
          <p><strong>Brand:</strong> ${frag.brand_name}</p>
          <p><strong>Scent Family:</strong> ${frag.scent_family}</p>
          <p><strong>Top Notes:</strong> ${frag.top_notes}</p>
          <p><strong>Base Notes:</strong> ${frag.base_notes}</p>
          <button class="btn-primary add-to-cart">Add to Cart</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('API error:', err);
      container.innerHTML = `<p>Error loading data.</p>`;
    });
}

// Load default results on page load
fetchFragrances();

// 🔁 Event Listeners
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length >= 3) fetchFragrances(query);
});

brandSelect.addEventListener('change', () => {
  const brand = brandSelect.value;
  if (brand) fetchFragrances(brand);
});

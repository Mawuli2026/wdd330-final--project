// Only run on products.html
if (document.getElementById('fragrance-results')) {
  import('./modules/fragrance.js').then(({ fetchFragrances }) => {
    const container = document.getElementById('fragrance-results');
    const searchInput = document.getElementById('search-input');
    const brandSelect = document.getElementById('brand-select');

    function renderFragrances(data) {
      container.innerHTML = '';

      if (!data.length) {
        container.innerHTML = '<p>No results found.</p>';
        return;
      }

      data.forEach(item => {
        const image = item.image?.startsWith('http') ? item.image : `https://fimgs.net/mdimg/perfume/${item.image}`;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${image}" alt="${item.fragrance_name}" />
          <h4>${item.fragrance_name}</h4>
          <p><strong>Brand:</strong> ${item.brand_name}</p>
          <p><strong>Family:</strong> ${item.scent_family || 'N/A'}</p>
          <p><strong>Top Notes:</strong> ${item.top_notes || 'N/A'}</p>
          <p><strong>Base Notes:</strong> ${item.base_notes || 'N/A'}</p>
          <button class="btn-primary add-to-cart">Add to Cart</button>
        `;

        container.appendChild(card);
      });
    }

    // Load default fragrances
    fetchFragrances().then(renderFragrances);

    // Enable search
    searchInput?.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (query.length >= 2) {
        fetchFragrances(query).then(renderFragrances);
      }
    });

    // Enable dropdown filter
    brandSelect?.addEventListener('change', () => {
      const brand = brandSelect.value;
      if (brand) {
        fetchFragrances(brand).then(renderFragrances);
      }
    });
  });
}

export async function fetchAndFilterProducts(searchTerm) {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  
    const container = document.getElementById('featured-products');
    container.innerHTML = '';
  
    filtered.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h4>${product.title}</h4>
        <p>${product.description}</p>
      `;
      container.appendChild(card);
    });
  }
// modules/recommendation.js
import { getAllFragrances } from '../api/fragranceAPI.js';

export async function displayFragranceRecommendations() {
  const container = document.getElementById('fragrance-recommendations');
  const data = await getAllFragrances();

  data.slice(0, 3).forEach(fragrance => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h4>${fragrance.fragrance_name}</h4>
      <p><strong>Brand:</strong> ${fragrance.brand_name}</p>
      <p><strong>Scent:</strong> ${fragrance.scent_family}</p>
    `;
    container.appendChild(card);
  });
}

// modules/fragrance.js

const API_KEY = '985f5fb336msh911097c9b937b61p11e1b8jsn35f70b7f9caf';
const API_HOST = 'fragrancefinder-api.p.rapidapi.com';

/**
 * Fetch fragrances by keyword (e.g., brand or scent note)
 */
export async function fetchFragrances(keyword = 'gucci') {
  const url = `https://${API_HOST}/search?keyword=${encodeURIComponent(keyword)}&perPage=10&page=1`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      }
    });

    const data = await res.json();
    console.log('🧪 API Data:', data); // For testing
    return data.results || [];

  } catch (err) {
    console.error('❌ Error fetching fragrances:', err);
    return [];
  }
}


// api/fragranceAPI.js
const BASE_URL = 'https://the-fragrance-api.p.rapidapi.com';
const HEADERS = {
  'X-RapidAPI-Key': 'YOUR_API_KEY',
  'X-RapidAPI-Host': 'the-fragrance-api.p.rapidapi.com'
};

export async function getAllFragrances() {
  try {
    const res = await fetch(`${BASE_URL}/fragrances/list`, {
      method: 'GET',
      headers: HEADERS
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error loading fragrance data:', error);
  }
}

export async function getFragranceDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/fragrances/details?id=${id}`, {
      method: 'GET',
      headers: HEADERS
    });
    return await res.json();
  } catch (error) {
    console.error('Error loading fragrance details:', error);
  }
}

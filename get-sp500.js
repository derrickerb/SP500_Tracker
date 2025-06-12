// netlify/functions/get-sp500.js
export async function handler(event, context) {
  const API_KEY = '65020c644abe4c71af390f8c5317f7cb';
  const url = `https://api.twelvedata.com/price?symbol=SPX&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ price: data.price }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch price' }),
    };
  }
}

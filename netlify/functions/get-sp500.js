export async function handler(event, context) {
  const API_KEY = '65020c644abe4c71af390f8c5317f7cb';
  const url = `https://api.twelvedata.com/time_series?symbol=SPX&interval=1min&outputsize=30&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const prices = data.values.map(point => ({
      time: Math.floor(new Date(point.datetime).getTime() / 1000),
      value: parseFloat(point.close),
    })).reverse(); // reverse to go from oldest to newest

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(prices),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch historical data' }),
    };
  }
}

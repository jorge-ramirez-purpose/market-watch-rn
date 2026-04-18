import { VercelRequest, VercelResponse } from '@vercel/node';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY || '';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the path (everything after /api/coingecko)
  const path = req.query.path || '/';
  const queryString = new URLSearchParams(req.query as Record<string, string>);

  // Remove 'path' from query params since it's handled separately
  queryString.delete('path');

  try {
    const url = `${COINGECKO_API}${path}${queryString.toString() ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY && { 'x-cg-demo-api-key': API_KEY }),
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `CoinGecko API error: ${response.statusText}`,
      });
    }

    const data = await response.json();

    // Set CORS headers and cache
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=60'); // Cache for 1 minute
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Failed to fetch from CoinGecko',
    });
  }
};

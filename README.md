# market-watch-rn

A market exploration app. Users can explore cryptocurrencies (via the free CoinGecko API), view detailed price charts, manage a watchlist, and receive simulated real-time updates via WebSocket.

## Getting Started

### Web Development

Run the app on web with CORS proxy support:

```bash
npm run web:proxy
```

This starts both the CORS proxy (port 3001) and Expo Web development server. The proxy allows web requests to the CoinGecko API without CORS issues.

### Native Development

For iOS/Android development:

```bash
npm start          # Start Expo
expo ios           # Run on iOS
expo android       # Run on Android
```

## Development Scripts

- `npm start` - Start Expo development server
- `npm run web` - Run Expo Web (without proxy)
- `npm run web:proxy` - Run Expo Web with CORS proxy
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm test` - Run tests

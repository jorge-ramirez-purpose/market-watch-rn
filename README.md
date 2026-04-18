# Market Watch RN

A cross-platform cryptocurrency market exploration app built with React Native and Expo. Users can discover cryptocurrencies via the CoinGecko API, view interactive price charts, manage a personal watchlist, and track real-time price changes.

## Features

- **Market Overview** — Browse top cryptocurrencies with real-time price data
- **Asset Details** — View detailed information with interactive price charts (recharts)
- **Price Charts** — Interactive line charts with timeframe selection (1D, 1W, 1M, 3M, 1Y)
- **Watchlist** — Add/remove coins with swipe-to-delete gestures
- **Settings** — Configure currency (USD/EUR) and theme preferences
- **Real-time Updates** — Simulated WebSocket-based price updates
- **Web & Native** — Runs on web (Expo Web), iOS, and Android

## Tech Stack

### Core
- **React Native & Expo 54** — Cross-platform development
- **TypeScript** — Type-safe development
- **React Navigation** — Navigation (native stack + bottom tabs)

### State & Data
- **TanStack Query (React Query)** — Server state management with caching
- **Zustand + Immer** — Client state for watchlist and settings
- **Zod** — Runtime data validation

### UI & Animations
- **React Native Reanimated** — High-performance animations
- **React Native Gesture Handler** — Gesture detection (swipe-to-delete)
- **Recharts** — Interactive charts (cross-platform)

### API & Networking
- **Native Fetch API** — HTTP requests with AbortSignal support
- **Custom CORS Proxy** — Local development proxy for web

## Getting Started

### Prerequisites

- Node.js v20+
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
```

### Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.coingecko.com/api/v3
EXPO_PUBLIC_COINGECKO_API_KEY=your_api_key_here
```

## Running the App

### Web Development

```bash
npm run web:proxy
```

This starts:
1. **CORS Proxy** (port 3001) — Handles CoinGecko API requests without CORS issues
2. **Expo Web** — Development server with hot reload

The proxy is necessary because the browser enforces CORS, but mobile and native builds don't.

### Native Development

```bash
# Start Expo
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Available Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Start Expo development server |
| `npm run web` | Run Expo Web (without proxy) |
| `npm run web:proxy` | Run Expo Web with CORS proxy |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm test` | Run Jest tests |

## Project Structure

```
src/
├── features/
│   ├── market/           # Market overview & coin listing
│   ├── asset-detail/     # Coin detail screens & charts
│   ├── watchlist/        # Watchlist management
│   └── settings/         # User preferences
├── shared/
│   ├── api/              # API client & data fetching
│   ├── components/       # Reusable components
│   ├── hooks/            # Custom hooks
│   ├── stores/           # Zustand state (watchlist, settings)
│   ├── schemas/          # Zod validation schemas
│   ├── types/            # TypeScript types
│   ├── constants/        # App constants & colors
│   └── utils/            # Helper functions
├── navigation/           # React Navigation setup
└── app.json              # Expo configuration
```

## Architecture Decisions

### State Management

- **Server State (TanStack Query):** Cryptocurrency data from API — cached, stale time 2 minutes
- **Client State (Zustand):** Watchlist items and user settings — persisted to AsyncStorage
- **Local State (useState):** UI state like timeframe selection

### API Strategy

- **Single CORS Proxy for Web:** Avoids browser CORS restrictions in development
- **Direct API Calls on Native:** iOS/Android don't enforce CORS
- **AbortSignal Support:** Clean request cancellation on component unmount

### Component Organization

- **Screen Components** → Large features with their own folder
- **Feature-Level Components** → Reusable within a feature
- **Shared Components** → Used across features (PriceChange, AnimatedPrice)
- **Styles Always Separate:** `Component.styles.ts` files for clarity

### Type Safety

- **`type` not `interface`** — Preferred for all type definitions
- **T-Prefix Convention** — `TComponentProps`, `TCoinDetail`, `TStateType`
- **Runtime Validation with Zod** — API responses validated at boundaries

## Key Patterns

### Hooks

```tsx
// Data fetching with automatic caching and refetching
const { data: coins } = useQuery({
  queryKey: [QUERY_KEYS.coins, currency],
  queryFn: ({ signal }) => fetchCoins({ currency, signal }),
  staleTime: 2 * 60 * 1000, // 2 minutes
});

// Zustand for local state (watchlist)
const items = useWatchlistStore((state) => state.items);
```

### Components

```tsx
type TMyComponentProps = {
  title: string;
  onPress: () => void;
};

export const MyComponent = ({ title, onPress }: TMyComponentProps) => {
  return <Pressable onPress={onPress}><Text>{title}</Text></Pressable>;
};
```

### Gestures & Animations

```tsx
// Swipe-to-delete with Reanimated
const panGesture = Gesture.Pan()
  .activeOffsetX([-10, 10])
  .onUpdate((event) => {
    translateX.value = Math.min(0, event.translationX);
  });
```

## Deployment

### Web (Vercel)

```bash
npm run build
# Deploy dist/ folder to Vercel
```

Uses `vercel.json` for configuration. SPA routing with rewrites to `/`.

### Native (EAS Build)

```bash
eas build --platform ios
eas build --platform android
```

Requires EAS account and app.json configuration.

## Performance Considerations

- **Lazy Rendering** — FlatList with pagination for coin lists
- **Memoization** — useMemo for expensive calculations (chart data)
- **Animation Thread** — Reanimated runs animations on UI thread, not JS thread
- **Query Caching** — TanStack Query automatically deduplicates requests

## Testing

```bash
npm test
```

Uses Jest + react-native test utilities. Test files colocated with source.

## Code Standards

All code follows these conventions (documented in `.claude/CLAUDE.md`):

1. **Types over Interfaces** — Use `type` keyword exclusively
2. **Arrow Functions** — No `function` declarations
3. **Separated Styles** — StyleSheet in `Component.styles.ts` files
4. **Type Prefix** — Props and types start with `T`: `TMyComponentProps`

## Contributing

1. Follow code standards above
2. Keep commits atomic and well-documented
3. No personal pronouns in commit messages
4. Run `npm test` before committing

## Troubleshooting

### CORS Errors on Web

Ensure the proxy is running:
```bash
npm run web:proxy
```

The proxy should be accessible at `http://localhost:3001`.

### Module Resolution Issues

Clear cache:
```bash
npm install
rm -rf node_modules/.cache
npx expo start --clear
```

### Stale Data

TanStack Query invalidates data after 2 minutes of staleness. Force a refetch:
```tsx
const { refetch } = useQuery(/* ... */);
refetch();
```

## Learning Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Zod Validation](https://zod.dev/)

## License

MIT

import { baseApi } from '../api/baseApi';

// CoinGecko API endpoints
export const coinGeckoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Test API connection
    testConnection: builder.query({
      query: () => '/ping',
      providesTags: [],
    }),

    // Get cryptocurrency list
    getCoinsList: builder.query({
      query: (params = {}) => ({
        url: '/coins/list',
        params,
      }),
      providesTags: ['Coin'],
    }),

    // Get market data for cryptocurrencies
    getMarketData: builder.query({
      query: (params = {}) => ({
        url: '/coins/markets',
        params,
      }),
      providesTags: ['Market'],
    }),

    // Get specific coin data
    getCoinData: builder.query({
      query: ({ coinId, ...params }) => ({
        url: `/coins/${coinId}`,
        params,
      }),
      providesTags: (result, error, { coinId }) => [{ type: 'Coin', id: coinId }],
    }),

    // Get coin price data
    getCoinPrice: builder.query({
      query: ({ coinId, ...params }) => ({
        url: '/simple/price',
        params: {
          ids: coinId,
          vs_currencies: 'usd',
          include_24hr_change: true,
          include_24hr_vol: true,
          include_last_updated_at: true,
          ...params,
        },
      }),
      providesTags: (result, error, { coinId }) => [{ type: 'Price', id: coinId }],
    }),

    // Get multiple coin prices
    getMultipleCoinPrices: builder.query({
      query: ({ coinIds, ...params }) => ({
        url: '/simple/price',
        params: {
          ids: coinIds.join(','),
          vs_currencies: 'usd',
          include_24hr_change: true,
          include_24hr_vol: true,
          include_last_updated_at: true,
          ...params,
        },
      }),
      providesTags: (result, error, { coinIds }) => 
        coinIds.map(id => ({ type: 'Price', id })),
    }),

    // Get trending coins
    getTrendingCoins: builder.query({
      query: () => '/search/trending',
      providesTags: ['Trending'],
    }),

    // Get global market data
    getGlobalMarketData: builder.query({
      query: () => '/global',
      providesTags: ['Global'],
    }),

    // Get coin historical data
    getCoinHistory: builder.query({
      query: ({ coinId, ...params }) => ({
        url: `/coins/${coinId}/history`,
        params,
      }),
      providesTags: (result, error, { coinId }) => [{ type: 'Coin', id: `${coinId}-history` }],
    }),

    // Get coin market chart data
    getCoinMarketChart: builder.query({
      query: ({ coinId, ...params }) => ({
        url: `/coins/${coinId}/market_chart`,
        params,
      }),
      providesTags: (result, error, { coinId }) => [{ type: 'Coin', id: `${coinId}-chart` }],
    }),

    // Get coin price chart data
    getCoinPriceChart: builder.query({
      query: ({ coinId, ...params }) => ({
        url: `/coins/${coinId}/market_chart/range`,
        params,
      }),
      providesTags: (result, error, { coinId }) => [{ type: 'Coin', id: `${coinId}-price-chart` }],
    }),

    // Get exchange rates
    getExchangeRates: builder.query({
      query: () => '/exchange_rates',
      providesTags: ['Global'],
    }),

    // Get supported vs currencies
    getSupportedVsCurrencies: builder.query({
      query: () => '/simple/supported_vs_currencies',
      providesTags: ['Global'],
    }),

    // Get coin categories
    getCoinCategories: builder.query({
      query: () => '/coins/categories',
      providesTags: ['Coin'],
    }),

    // Get coin category data
    getCoinCategoryData: builder.query({
      query: ({ categoryId, ...params }) => ({
        url: `/coins/categories/${categoryId}`,
        params,
      }),
      providesTags: (result, error, { categoryId }) => [{ type: 'Coin', id: `category-${categoryId}` }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useTestConnectionQuery,
  useGetCoinsListQuery,
  useGetMarketDataQuery,
  useGetCoinDataQuery,
  useGetCoinPriceQuery,
  useGetMultipleCoinPricesQuery,
  useGetTrendingCoinsQuery,
  useGetGlobalMarketDataQuery,
  useGetCoinHistoryQuery,
  useGetCoinMarketChartQuery,
  useGetCoinPriceChartQuery,
  useGetExchangeRatesQuery,
  useGetSupportedVsCurrenciesQuery,
  useGetCoinCategoriesQuery,
  useGetCoinCategoryDataQuery,
} = coinGeckoApi;

export default coinGeckoApi;

import { baseApi } from "../api/baseApi";

// CoinGecko API endpoints
export const coinGeckoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get coin price data
    getCoinPrice: builder.query({
      query: ({ coinId, ...params }) => ({
        url: "/simple/price",
        params: {
          ids: coinId,
          vs_currencies: "usd",
          include_24hr_change: true,
          include_24hr_vol: true,
          include_last_updated_at: true,
          ...params,
        },
      }),
      providesTags: (result, error, { coinId }) => [
        { type: "Price", id: coinId },
      ],
    }),

    // Get multiple coin prices
    getMultipleCoinPrices: builder.query({
      query: ({ coinIds, ...params }) => ({
        url: "/simple/price",
        params: {
          ids: coinIds.join(","),
          vs_currencies: "usd",
          include_24hr_change: true,
          include_24hr_vol: true,
          include_last_updated_at: true,
          ...params,
        },
      }),
      providesTags: (result, error, { coinIds }) =>
        coinIds.map((id) => ({ type: "Price", id })),
    }),

    // Get trending coins
    getTrendingCoins: builder.query({
      query: () => "/search/trending",
      providesTags: ["Trending"],
    }),

    // Search coins
    searchCoins: builder.query({
      query: ({ query, ...params }) => ({
        url: "/search",
        params: {
          query,
          ...params,
        },
      }),
      providesTags: (result, error, { query }) => [
        { type: "Search", id: query },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCoinPriceQuery,
  useGetMultipleCoinPricesQuery,
  useGetTrendingCoinsQuery,
  useSearchCoinsQuery,
} = coinGeckoApi;

export default coinGeckoApi;

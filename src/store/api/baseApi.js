import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API configuration
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_COINGECKO_BASE_URL,
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
      if (apiKey) {
        headers.set('x-cg-demo-api-key', apiKey);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Coin', 'Market', 'Price', 'Trending', 'Global'],
  endpoints: () => ({}),
});

export default baseApi;

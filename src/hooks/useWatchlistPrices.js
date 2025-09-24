import { useSelector } from "react-redux";
import { useGetMultipleCoinPricesQuery } from "../store/api/coinGeckoApi";
import { selectWatchlist } from "../store/slices/portfolioSlice";

/**
 * Custom hook to manage watchlist price data
 * This centralizes the price fetching logic and provides both data and refresh functionality
 *
 * Benefits:
 * - Single source of truth for price data
 * - Automatic deduplication of API calls
 * - Consistent loading and error states
 * - Easy to test and maintain
 */
export const useWatchlistPrices = () => {
  const watchlist = useSelector(selectWatchlist);

  // Extract coin IDs for API call
  const coinIds = watchlist.map((coin) => coin.id);

  // Fetch price data for all coins in watchlist
  const {
    data: priceData,
    isLoading,
    error,
    refetch,
  } = useGetMultipleCoinPricesQuery(
    { coinIds },
    {
      skip: coinIds.length === 0,
      // pollingInterval: 30000, // Refetch every 30 seconds
    }
  );

  return {
    priceData,
    isLoading,
    error,
    refetch,
    coinIds,
    hasWatchlistItems: coinIds.length > 0,
  };
};

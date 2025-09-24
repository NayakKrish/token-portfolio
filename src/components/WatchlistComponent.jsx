import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WatchlistTable from "./WatchlistTable";
import StarIcon from "../assets/star-icon.svg";
import RefreshIcon from "../assets/refresh-icon.svg";
import AddIcon from "../assets/add-icon.svg";
import {
  openAddTokenModal,
  selectHoldings,
  updateHolding,
} from "../store/slices/portfolioSlice";
import { useWatchlistPrices } from "../hooks/useWatchlistPrices";
import AddTokenModal from "./AddTokenModal";

const WatchlistComponent = () => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get holdings from Redux store
  const holdings = useSelector(selectHoldings);

  // Use custom hook for price data management
  const { refetch: refetchPrices, hasWatchlistItems } = useWatchlistPrices();

  const handleRefreshPrices = async () => {
    if (!hasWatchlistItems) {
      console.log("No coins in watchlist to refresh");
      return;
    }

    setIsRefreshing(true);
    try {
      // Refetch price data - this will update the cache that WatchlistTable is using
      const result = await refetchPrices();

      if (result.data && holdings.length > 0) {
        // Update holdings with new prices
        holdings.forEach((holding) => {
          const priceInfo = result.data[holding.id];
          if (priceInfo?.usd) {
            dispatch(
              updateHolding({
                id: holding.id,
                updates: { currentPrice: priceInfo.usd },
              })
            );
          }
        });
      }

      console.log("Prices refreshed successfully!");
    } catch (error) {
      console.error("Error refreshing prices:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddToken = () => {
    dispatch(openAddTokenModal());
  };

  return (
    <div className="flex flex-col gap-4 mx-4 sm:mx-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={StarIcon} alt="watchlist" />
          <h2 className="text-[#F4F4F5] text-2xl font-medium">Watchlist</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshPrices}
            disabled={isRefreshing || !hasWatchlistItems}
            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
              isRefreshing || !hasWatchlistItems
                ? "bg-[#1F1F23] cursor-not-allowed opacity-50"
                : "bg-[#27272A] hover:bg-[#3F3F46]"
            }`}
          >
            <img
              src={RefreshIcon}
              alt="refresh"
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="text-[#F4F4F5] text-sm font-medium hidden sm:block">
              {isRefreshing ? "Refreshing..." : "Refresh Prices"}
            </span>
          </button>

          <button
            onClick={handleAddToken}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#A9E851] cursor-pointer"
          >
            <img src={AddIcon} alt="add" />
            <span className="text-[#18181B] text-sm font-medium">
              Add Token
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <WatchlistTable />

      {/* Add Token Modal */}
      <AddTokenModal />
    </div>
  );
};

export default WatchlistComponent;

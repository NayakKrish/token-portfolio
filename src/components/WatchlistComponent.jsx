import React from "react";
import WatchlistTable from "./WatchlistTable";
import StarIcon from "../assets/star-icon.svg";
import RefreshIcon from "../assets/refresh-icon.svg";
import AddIcon from "../assets/add-icon.svg";

const WatchlistComponent = () => {
  const handleRefreshPrices = () => {
    // TODO: Implement refresh prices functionality
    console.log("Refreshing prices...");
  };

  const handleAddToken = () => {
    // TODO: Implement add token functionality
    console.log("Adding token...");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={StarIcon} alt="watchlist" />
          <h2 className="text-[#F4F4F5] text-2xl font-medium">Watchlist</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshPrices}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#27272A] cursor-pointer"
          >
            <img src={RefreshIcon} alt="refresh" />
            <span className="text-[#F4F4F5] text-sm font-medium">
              Refresh Prices
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
    </div>
  );
};

export default WatchlistComponent;

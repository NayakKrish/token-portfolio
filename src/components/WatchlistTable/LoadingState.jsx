import React from "react";

const LoadingState = () => {
  return (
    <div className="rounded-xl border border-[#FFFFFF14] p-8">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A9E851]"></div>
          <p className="text-[#A1A1AA] text-sm">Loading watchlist data...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;

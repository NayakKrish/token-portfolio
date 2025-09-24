import React from "react";

const ErrorState = ({ onRetry }) => {
  return (
    <div className="rounded-xl border border-[#FFFFFF14] p-8">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl">⚠️</div>
          <p className="text-[#A1A1AA] text-sm">Failed to load price data</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[#A9E851] text-[#18181B] rounded-md text-sm font-medium hover:bg-[#9BD441] transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;

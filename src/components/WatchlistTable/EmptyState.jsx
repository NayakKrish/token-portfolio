import React from "react";
import StarIcon from "../../assets/star-icon.svg";

const EmptyState = () => {
  return (
    <div className="rounded-xl border border-[#FFFFFF14] p-8">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src={StarIcon} alt="empty state" />
          <p className="text-[#A1A1AA] text-md">Your watchlist is empty</p>
          <p className="text-[#71717A] text-xs text-center max-w-sm">
            Add tokens to your watchlist to track their prices and performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

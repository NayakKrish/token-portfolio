import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromWatchlist as removeFromWatchlistAction,
  selectWatchlist,
  selectHoldings,
  removeHolding,
  updateHolding,
} from "../../store/slices/portfolioSlice";
import { useWatchlistPrices } from "../../hooks/useWatchlistPrices";

// Import components
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import TableHeader from "./TableHeader";
import WatchlistTableRow from "./WatchlistTableRow";
import Pagination from "./Pagination";

const WatchlistTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const itemsPerPage = 10;

  // Get watchlist and holdings from Redux store
  const watchlist = useSelector(selectWatchlist);
  const holdings = useSelector(selectHoldings);

  // Use custom hook for price data management
  const {
    priceData,
    isLoading: isPriceLoading,
    error: priceError,
    refetch: refetchPrices,
    hasWatchlistItems,
  } = useWatchlistPrices();

  // Combine watchlist data with price data and holdings
  const tokens = useMemo(() => {
    if (!priceData || !watchlist.length) return [];

    return watchlist.map((coin) => {
      const priceInfo = priceData[coin.id];
      const currentPrice = priceInfo?.usd || coin.current_price || 0;
      const change24h =
        priceInfo?.usd_24h_change || coin.price_change_percentage_24h || 0;

      // Find the corresponding holding for this coin
      const holding = holdings.find((h) => h.id === coin.id);
      const holdingsAmount = holding?.holdings || 0;

      return {
        price: currentPrice,
        change24h: change24h,
        holdings: holdingsAmount,
        value: holdingsAmount * currentPrice,
        ...coin,
      };
    });
  }, [watchlist, priceData, holdings]);

  const totalPages = Math.ceil(tokens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTokens = tokens.slice(startIndex, endIndex);

  // Event handlers
  const removeToken = (tokenId) => {
    dispatch(removeFromWatchlistAction(tokenId));
    dispatch(removeHolding(tokenId));
    setOpenPopoverId(null);
  };

  const handleEditHoldings = (token) => {
    setOpenPopoverId(null);
    setEditingId(token.id);
    setEditAmount(String(token.holdings ?? 0));
  };

  const handleSaveHoldings = (token) => {
    const parsed = parseFloat(editAmount);
    if (!isNaN(parsed)) {
      dispatch(
        updateHolding({
          id: token.id,
          updates: {
            holdings: parsed,
            price: token.price,
            change24h: token.change24h,
            name: token.name,
            symbol: token.symbol,
            image: token.image,
          },
        })
      );
    }
    setEditingId(null);
  };

  const handleTogglePopover = (tokenId) => {
    setOpenPopoverId(openPopoverId === tokenId ? null : tokenId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openPopoverId && !event.target.closest(".popover-container")) {
        setOpenPopoverId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openPopoverId]);

  // Loading state
  if (isPriceLoading && hasWatchlistItems) {
    return <LoadingState />;
  }

  // Error state
  if (priceError && hasWatchlistItems) {
    return <ErrorState onRetry={refetchPrices} />;
  }

  // Empty state
  if (!hasWatchlistItems) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-xl border border-[#FFFFFF14]">
      {/* Table */}
      <table className="w-full">
        <TableHeader />
        <tbody className="[&>tr>td]:px-4 [&>tr>td]:py-2 [&>tr>td]:text-left">
          {currentTokens.map((token) => (
            <WatchlistTableRow
              key={token.id}
              token={token}
              editingId={editingId}
              editAmount={editAmount}
              openPopoverId={openPopoverId}
              onEditAmountChange={setEditAmount}
              onSaveHoldings={handleSaveHoldings}
              onEditHoldings={handleEditHoldings}
              onTogglePopover={handleTogglePopover}
              onRemoveToken={removeToken}
            />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={tokens.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default WatchlistTable;

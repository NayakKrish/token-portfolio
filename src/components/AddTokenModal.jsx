import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetTrendingCoinsQuery,
  useSearchCoinsQuery,
} from "../store/api/coinGeckoApi";
import {
  selectAddTokenModalOpen,
  selectWatchlist,
  closeAddTokenModal,
  addToWatchlist,
} from "../store/slices/portfolioSlice";
import CheckCircleIcon from "../assets/check_circle.svg";
import StarIcon from "../assets/star-icon.svg";

const AddTokenModal = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const isOpen = useSelector(selectAddTokenModalOpen);
  const watchlist = useSelector(selectWatchlist);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Load trending coins when modal is open and no search
  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
    refetch: refetchTrending,
  } = useGetTrendingCoinsQuery(undefined, {
    skip: !isOpen || debouncedSearch.trim().length > 0,
  });

  // Search coins when there's a search query
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    refetch: refetchSearch,
  } = useSearchCoinsQuery(
    { query: debouncedSearch },
    {
      skip: !isOpen || debouncedSearch.trim().length === 0,
    }
  );

  const tokens = useMemo(() => {
    if (debouncedSearch.trim().length > 0) {
      // Handle search results format
      if (!searchData?.coins?.length) return [];
      return searchData.coins.map((coin) => ({
        id: coin.id,
        coin_id: coin.id,
        image: coin.thumb || coin.small || coin.large,
        name: coin.name,
        symbol: coin.symbol,
        slug: coin.slug,
        data: coin.data,
        market_cap_rank: coin.market_cap_rank,
      }));
    } else {
      // Handle trending results format
      if (!trendingData?.coins?.length) return [];
      return trendingData.coins.map((entry) => {
        const item = entry.item || entry; // safety
        return {
          id: item.id,
          coin_id: item.coin_id,
          image: item.small || item.thumb || item.large,
          name: item.name,
          symbol: item.symbol,
          slug: item.slug,
          data: item.data,
          market_cap_rank: item.market_cap_rank,
        };
      });
    }
  }, [trendingData, searchData, debouncedSearch]);

  const onClose = useCallback(() => {
    dispatch(closeAddTokenModal());
    setSelectedIds([]);
    setSearch("");
    setDebouncedSearch("");
  }, [dispatch]);

  const onConfirm = useCallback(
    (pickedTokens) => {
      if (!Array.isArray(pickedTokens)) {
        pickedTokens = [pickedTokens];
      }
      pickedTokens.forEach((t) => dispatch(addToWatchlist(t)));
      onClose();
    },
    [dispatch, onClose]
  );

  // Focus the search input when the modal opens
  const inputRef = useRef(null);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape / confirm on Enter
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Enter" && selectedIds.length > 0) {
        const picked = tokens.filter((t) => selectedIds.includes(t.id));
        onConfirm(picked);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onConfirm, selectedIds, tokens]);

  // Preselect already-added tokens from watchlist whenever modal opens or list changes
  useEffect(() => {
    if (!isOpen) return;
    const existingIds = (watchlist || []).map((c) => c.id);
    setSelectedIds((prev) => {
      // Keep any current manual selections plus ensure watchlist ones are included
      const set = new Set([...existingIds, ...prev]);
      return Array.from(set);
    });
  }, [isOpen, watchlist, tokens]);

  // Determine loading and error states
  const isLoading =
    debouncedSearch.trim().length > 0 ? isSearchLoading : isTrendingLoading;
  const isError =
    debouncedSearch.trim().length > 0 ? isSearchError : isTrendingError;
  const refetch =
    debouncedSearch.trim().length > 0 ? refetchSearch : refetchTrending;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#212124D9]"
        onClick={() => onClose()}
      />

      {/* Modal container */}
      <div
        ref={containerRef}
        className="relative w-160 rounded-xl border border-[#FFFFFF14] bg-[#212124] shadow-lg shadow-[#18181B]"
      >
        {/* Header with search */}
        <div className="px-4 py-3 border-b border-[#FFFFFF14]">
          <div className="flex items-center justify-between">
            <input
              type="text"
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tokens (e.g., ETH, SOL)…"
              className="w-full bg-transparent text-sm text-[#F4F4F5] placeholder:text-[#71717A] outline-none"
            />
            <button
              onClick={() => onClose()}
              className="ml-3 text-[#A1A1AA] hover:text-white cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body: list */}
        <div className="max-h-90 min-h-90 overflow-y-auto p-2 space-y-1">
          <div className="p-2 text-xs text-[#71717A]">
            {debouncedSearch.trim().length > 0 ? "Search Results" : "Trending"}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="px-4 py-6 text-sm text-[#A1A1AA] flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#A9E851]" />
              Loading…
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="px-4 py-6 text-sm text-[#A1A1AA] flex items-center justify-center gap-2">
              Failed to load.{" "}
              <button
                onClick={() => refetch()}
                className="cursor-pointer text-[#A9E851]"
              >
                Retry
              </button>
            </div>
          )}

          {/* List */}
          {tokens.length > 0 &&
            tokens.map((token) => (
              <button
                key={token.id}
                onClick={() =>
                  setSelectedIds((prev) =>
                    prev.includes(token.id)
                      ? prev.filter((id) => id !== token.id)
                      : [...prev, token.id]
                  )
                }
                className={`w-full p-2 flex items-center justify-between rounded-md cursor-pointer ${
                  selectedIds.includes(token.id)
                    ? "bg-[#A9E8510F]"
                    : "hover:bg-[#27272A]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center">
                    {token.image ? (
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-[#A1A1AA]">
                        {token.symbol}
                      </span>
                    )}
                  </div>
                  <div className="text-left flex items-center gap-2">
                    <span className="text-sm text-[#F4F4F5] font-normal">
                      {token.name} ({token.symbol})
                    </span>
                  </div>
                </div>

                {/* Circle check (multi-select) */}
                {selectedIds.includes(token.id) ? (
                  <div className="flex items-center gap-3">
                    <img src={StarIcon} alt="star" className="w-3 h-3" />
                    <img src={CheckCircleIcon} alt="check" />
                  </div>
                ) : (
                  <div
                    className={`w-3 h-3 rounded-full border ${
                      selectedIds.includes(token.id) ? "" : "border-[#3F3F46]"
                    } flex items-center justify-center`}
                  />
                )}
              </button>
            ))}

          {!isLoading && !isError && tokens.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[#A1A1AA]">
              {debouncedSearch.trim().length > 0
                ? "No results found"
                : "No trending coins available"}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#FFFFFF14] bg-[#27272A] flex items-center justify-end rounded-b-xl">
          <button
            disabled={selectedIds.length === 0}
            onClick={() => {
              if (selectedIds.length === 0) return;
              const picked = tokens.filter((t) => selectedIds.includes(t.id));
              onConfirm(picked);
            }}
            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors bg-[#A9E851] hover:bg-[#9BD441] text-[#18181B] border border-[#FFFFFF1A] disabled:cursor-not-allowed disabled:bg-[#27272A] disabled:text-[#52525B]"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTokenModal;

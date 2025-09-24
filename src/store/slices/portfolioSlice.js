import { createSlice } from "@reduxjs/toolkit";

// Helper functions for local storage
const loadFromLocalStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Load initial data from localStorage
const initialWatchlist = loadFromLocalStorage("portfolio_watchlist", []);
const initialHoldings = loadFromLocalStorage("portfolio_holdings", []);

// Initial state
const initialState = {
  isLoading: false,
  error: null,
  lastRequestTime: null,
  requestCount: 0,
  rateLimit: {
    remaining: null,
    reset: null,
  },
  watchlist: initialWatchlist,
  holdings: initialHoldings,
  addTokenModalOpen: false,
};

// Portfolio slice
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPortfolioState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.lastRequestTime = null;
      state.requestCount = 0;
    },
    updateRateLimit: (state, action) => {
      state.rateLimit = { ...state.rateLimit, ...action.payload };
    },
    // Watchlist actions
    addToWatchlist: (state, action) => {
      const coin = action.payload;
      const exists = state.watchlist.some((item) => item.id === coin.id);
      if (!exists) {
        state.watchlist.push(coin);
        saveToLocalStorage("portfolio_watchlist", state.watchlist);
      }
    },
    removeFromWatchlist: (state, action) => {
      const coinId = action.payload;
      state.watchlist = state.watchlist.filter((item) => item.id !== coinId);
      saveToLocalStorage("portfolio_watchlist", state.watchlist);
    },
    updateWatchlist: (state, action) => {
      state.watchlist = action.payload;
      saveToLocalStorage("portfolio_watchlist", state.watchlist);
    },
    // Holdings actions
    addHolding: (state, action) => {
      const holding = action.payload;
      const existingIndex = state.holdings.findIndex(
        (item) => item.id === holding.id
      );
      if (existingIndex >= 0) {
        // Update existing holding
        state.holdings[existingIndex] = {
          ...state.holdings[existingIndex],
          ...holding,
        };
      } else {
        // Add new holding
        state.holdings.push(holding);
      }
      saveToLocalStorage("portfolio_holdings", state.holdings);
    },
    removeHolding: (state, action) => {
      const coinId = action.payload;
      state.holdings = state.holdings.filter((item) => item.id !== coinId);
      saveToLocalStorage("portfolio_holdings", state.holdings);
    },
    updateHolding: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.holdings.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.holdings[index] = { ...state.holdings[index], ...updates };
      } else {
        // Create a new holding if it does not exist
        state.holdings.push({ id, ...updates });
      }
      saveToLocalStorage("portfolio_holdings", state.holdings);
    },
    openAddTokenModal: (state) => {
      state.addTokenModalOpen = true;
    },
    closeAddTokenModal: (state) => {
      state.addTokenModalOpen = false;
    },
  },
});

// Export actions
export const {
  clearError,
  resetPortfolioState,
  updateRateLimit,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlist,
  addHolding,
  removeHolding,
  updateHolding,
  openAddTokenModal,
  closeAddTokenModal,
} = portfolioSlice.actions;

// Selectors
export const selectPortfolioState = (state) => state.portfolio;
export const selectIsLoading = (state) => state.portfolio.isLoading;
export const selectPortfolioError = (state) => state.portfolio.error;
export const selectRateLimit = (state) => state.portfolio.rateLimit;
export const selectAddTokenModalOpen = (state) =>
  state.portfolio.addTokenModalOpen;

// Watchlist selectors
export const selectWatchlist = (state) => state.portfolio.watchlist;
export const selectWatchlistById = (coinId) => (state) =>
  state.portfolio.watchlist.find((item) => item.id === coinId);
export const selectIsInWatchlist = (coinId) => (state) =>
  state.portfolio.watchlist.some((item) => item.id === coinId);

// Holdings selectors
export const selectHoldings = (state) => state.portfolio.holdings;
export const selectHoldingById = (coinId) => (state) =>
  state.portfolio.holdings.find((item) => item.id === coinId);
export const selectTotalHoldingsValue = (state) =>
  state.portfolio.holdings.reduce(
    (total, holding) => total + (holding.value || 0),
    0
  );
export const selectHoldingsCount = (state) => state.portfolio.holdings.length;

export default portfolioSlice.reducer;

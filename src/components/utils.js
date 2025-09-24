/**
 * Format price
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Format change
 * @param {number} change
 * @returns {string}
 */
export const formatChange = (change) => {
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
};

/**
 * Calculate total portfolio value
 * @param {Array} holdings - Array of holdings with amount and current price
 * @returns {number} Total portfolio value
 */
export const calculateTotalPortfolioValue = (holdings) => {
  return holdings.reduce((total, holding) => {
    const value = (holding.amount || 0) * (holding.currentPrice || 0);
    return total + value;
  }, 0);
};

/**
 * Calculate percentage of each holding in portfolio
 * @param {Array} holdings - Array of holdings with amount and current price
 * @param {number} totalValue - Total portfolio value
 * @returns {Array} Holdings with percentage added
 */
export const calculateHoldingsPercentages = (holdings, totalValue) => {
  if (totalValue === 0)
    return holdings.map((holding) => ({ ...holding, percentage: 0 }));

  return holdings.map((holding) => {
    const value = (holding.amount || 0) * (holding.currentPrice || 0);
    const percentage = (value / totalValue) * 100;
    return {
      ...holding,
      percentage: percentage,
      value: value,
    };
  });
};

/**
 * Format percentage
 * @param {number} percentage
 * @returns {string}
 */
export const formatPercentage = (percentage) => {
  return `${percentage.toFixed(1)}%`;
};

/**
 * Get color for portfolio chart based on index
 * @param {number} index
 * @returns {string} Hex color code
 */
export const getPortfolioColor = (index) => {
  const colors = [
    "#A78BFA",
    "#FB7185",
    "#10B981",
    "#60A5FA",
    "#18C9DD",
    "#FB923C",
    "#F59E0B",
    "#EC4899",
    "#8B5CF6",
    "#3B82F6",
    "#2563EB",
  ];
  return colors[index % colors.length];
};

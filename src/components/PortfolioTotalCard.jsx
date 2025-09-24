import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import DonutChart from "./DonutChart";
import { selectHoldings } from "../store/slices/portfolioSlice";
import {
  formatPrice,
  calculateTotalPortfolioValue,
  calculateHoldingsPercentages,
  formatPercentage,
  getPortfolioColor,
} from "./utils";

const PortfolioTotalCard = () => {
  // Get holdings from Redux store
  const holdings = useSelector(selectHoldings);

  // Calculate portfolio metrics using existing holdings data
  const portfolioData = useMemo(() => {
    if (!holdings.length) {
      return {
        totalValue: 0,
        holdingsWithPrices: [],
        chartData: [],
        displayData: [],
      };
    }

    // Use existing holdings data with currentPrice
    const holdingsWithPrices = holdings.map((holding) => {
      const currentPrice = holding.price || 0;
      const change24h = holding.change24h || 0;
      const amount = holding.holdings || 0;

      return {
        ...holding,
        currentPrice,
        change24h,
        amount,
        value: amount * currentPrice,
      };
    });

    // Calculate total portfolio value
    const totalValue = calculateTotalPortfolioValue(holdingsWithPrices);

    // Calculate percentages for each holding
    const holdingsWithPercentages = calculateHoldingsPercentages(
      holdingsWithPrices,
      totalValue
    );

    // Prepare data for donut chart
    const chartData = holdingsWithPercentages.map((holding, index) => ({
      name: holding.name,
      value: holding.value,
      color: getPortfolioColor(index),
    }));

    // Prepare data for display
    const displayData = holdingsWithPercentages.map((holding, index) => ({
      label: `${holding.name} (${holding.symbol})`,
      percent: formatPercentage(holding.percentage),
      color: getPortfolioColor(index),
    }));

    return {
      totalValue,
      holdingsWithPrices,
      chartData,
      displayData,
    };
  }, [holdings]);

  const portfolioTotal = formatPrice(portfolioData.totalValue);

  // Empty state
  if (holdings.length === 0) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 sm:gap-5 p-6 rounded-xl bg-[#27272A]">
        <div className="flex flex-col gap-3 flex-1">
          <h4 className="text-sm font-medium text-[#A1A1AA]">
            Portfolio Total
          </h4>
          <h1 className="text-4xl font-semibold text-[#F4F4F5]">$0.00</h1>
          <p className="text-sm font-medium text-[#A1A1AA] mt-24 sm:mt-0">
            No holdings added yet
          </p>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <h4 className="text-sm font-medium text-[#A1A1AA]">
            Portfolio Distribution
          </h4>
          <div className="flex items-center justify-center h-48">
            <p className="text-[#A1A1AA] text-sm">
              Add holdings to see portfolio distribution
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 sm:gap-5 p-6 sm:rounded-xl bg-[#27272A]">
      {/* portfolio total amount and date section */}
      <div className="flex flex-col gap-3 flex-1">
        <h4 className="text-sm font-medium text-[#A1A1AA]">Portfolio Total</h4>
        <h1 className="text-4xl font-semibold text-[#F4F4F5]">
          {portfolioTotal}
        </h1>
        <p className="text-sm font-medium text-[#A1A1AA] mt-0 sm:mt-24">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* portfolio chart and details section */}
      <div className="flex flex-col gap-3 flex-1 w-full">
        <h4 className="text-sm font-medium text-[#A1A1AA]">
          Portfolio Distribution
        </h4>

        {/* chart */}
        <div className="flex flex-col sm:flex-row w-full items-center sm:items-start justify-center sm:justify-start gap-5">
          <DonutChart data={portfolioData.chartData} />

          {/* details */}
          <div className="flex flex-col gap-4 w-full">
            {portfolioData.displayData.map((item, index) => (
              <div
                key={`${item.label}-${item.percent}-${index}`}
                className="flex items-center justify-between"
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: item.color }}
                >
                  {item.label}
                </span>
                <span className="text-sm font-medium text-[#A1A1AA]">
                  {item.percent}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTotalCard;

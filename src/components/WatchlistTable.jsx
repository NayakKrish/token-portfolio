import React, { useState } from "react";
import EllipsisIcon from "../assets/ellipsis-horizontal.svg";

const WatchlistTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data based on the screenshot
  const tokens = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      price: 43250.67,
      change24h: 2.3,
      holdings: 0.05,
      value: 2162.53,
      icon: "🔷", // Using emoji as placeholder, can be replaced with actual icons
      sparklineData: [
        1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 7, 6, 8, 9, 8,
      ],
    },
    {
      id: 2,
      name: "Bitcoin",
      symbol: "BTC",
      price: 2654.32,
      change24h: -1.2,
      holdings: 2.5,
      value: 6635.8,
      icon: "🔶",
      sparklineData: [
        8, 7, 6, 5, 4, 5, 6, 5, 4, 3, 4, 5, 4, 3, 2, 3, 4, 3, 2, 1,
      ],
    },
    {
      id: 3,
      name: "Solana",
      symbol: "SOL",
      price: 98.45,
      change24h: 4.7,
      holdings: 2.5,
      value: 1476.75,
      icon: "🟣",
      sparklineData: [
        2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 8, 9, 10, 9, 8, 9, 10, 11, 10, 9,
      ],
    },
    {
      id: 4,
      name: "Dogecoin",
      symbol: "DOGE",
      price: 43250.67,
      change24h: 2.3,
      holdings: 0.05,
      value: 2162.53,
      icon: "🐕",
      sparklineData: [
        3, 4, 5, 4, 3, 4, 5, 6, 7, 6, 5, 6, 7, 8, 7, 6, 7, 8, 9, 8,
      ],
    },
    {
      id: 5,
      name: "USDC",
      symbol: "USDC",
      price: 2654.32,
      change24h: -1.2,
      holdings: 2.5,
      value: 6635.8,
      icon: "💵",
      sparklineData: [
        5, 4, 3, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1, 2,
      ],
    },
    {
      id: 6,
      name: "Stellar",
      symbol: "XLM",
      price: 98.45,
      change24h: 4.7,
      holdings: 15.0,
      value: 1476.75,
      icon: "⭐",
      sparklineData: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 8, 9, 10, 11, 10, 9, 10, 11, 12,
      ],
    },
  ];

  const totalPages = Math.ceil(tokens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTokens = tokens.slice(startIndex, endIndex);

  const Sparkline = ({ data, isPositive }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="w-20 h-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          <polyline
            fill="none"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="2"
            points={points}
          />
        </svg>
      </div>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change) => {
    const sign = change > 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                Token
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                Price
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                24h %
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                Sparkline (7d)
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                Holdings
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                Value
              </th>
              <th className="w-10 py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentTokens.map((token) => (
              <tr
                key={token.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                      {token.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{token.name}</div>
                      <div className="text-gray-400 text-sm">
                        ({token.symbol})
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-white font-medium">
                  {formatPrice(token.price)}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`font-medium ${
                      token.change24h > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {formatChange(token.change24h)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Sparkline
                    data={token.sparklineData}
                    isPositive={token.change24h > 0}
                  />
                </td>
                <td className="py-4 px-4 text-white">
                  {token.holdings.toFixed(4)}
                </td>
                <td className="py-4 px-4 text-white font-medium">
                  {formatPrice(token.value)}
                </td>
                <td className="py-4">
                  <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <img src={EllipsisIcon} alt="more options" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
        <div className="text-gray-400 text-sm">
          {startIndex + 1} — {Math.min(endIndex, tokens.length)} of{" "}
          {tokens.length} results
        </div>

        <div className="flex items-center gap-4">
          <div className="text-gray-400 text-sm">
            {currentPage} of {totalPages} pages
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistTable;

import React, { useState } from "react";
import EllipsisIcon from "../assets/ellipsis-horizontal.svg";
import StockLineChart from "./StockLineChart";
import { formatPrice, formatChange } from "./utils";

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

  const tableHeaderCellClass =
    "text-left text-[#A1A1AA] font-medium text-sm p-4";

  return (
    <div className="rounded-xl border border-[#FFFFFF14]">
      {/* Table */}
      <table className="w-full">
        {/* Table header */}
        <thead className="bg-[#27272A]">
          <tr className="border-b border-[#FFFFFF14]">
            <th className={`rounded-tl-xl ${tableHeaderCellClass}`}>Token</th>
            <th className={tableHeaderCellClass}>Price</th>
            <th className={tableHeaderCellClass}>24h %</th>
            <th className={tableHeaderCellClass}>Sparkline (7d)</th>
            <th className={tableHeaderCellClass}>Holdings</th>
            <th className={tableHeaderCellClass}>Value</th>
            <th className={`rounded-tr-xl ${tableHeaderCellClass}`}></th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="[&>tr>td]:px-6">
          {currentTokens.map((token) => (
            <tr key={token.id} className="bg-[#212124] hover:bg-[#27272A]">
              {/* Token */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                    {token.icon}
                  </div>
                  <span className="text-xs text-[#F4F4F5] font-normal">
                    {token.name}{" "}
                    <span className="text-[#A1A1AA] text-sm">
                      ({token.symbol})
                    </span>
                  </span>
                </div>
              </td>

              {/* Price */}
              <td>
                <span className="text-xs text-[#A1A1AA] font-normal">
                  {formatPrice(token.price)}
                </span>
              </td>

              {/* 24h % */}
              <td>
                <span className="text-xs text-[#A1A1AA] font-normal">
                  {formatChange(token.change24h)}
                </span>
              </td>

              {/* Sparkline (7d) */}
              <td>
                <div className="flex items-end justify-start">
                  <StockLineChart />
                </div>
              </td>

              {/* Holdings */}
              <td>
                <span className="text-xs text-[#F4F4F5] font-normal">
                  {token.holdings.toFixed(4)}
                </span>
              </td>

              {/* Value */}
              <td>
                <span className="text-xs text-[#F4F4F5] font-normal">
                  {formatPrice(token.value)}
                </span>
              </td>

              {/* More options */}
              <td>
                <button className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer">
                  <img
                    src={EllipsisIcon}
                    alt="more options"
                    className="w-4 h-4"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-[#FFFFFF14] ">
        {/* Results */}
        <span className="text-[#A1A1AA] text-sm font-medium">
          {startIndex + 1} — {Math.min(endIndex, tokens.length)} of{" "}
          {tokens.length} results
        </span>

        <div className="flex items-center gap-6">
          {/* Pages */}
          <span className="text-[#A1A1AA] text-sm font-medium">
            {currentPage} of {totalPages} pages
          </span>

          {/* Prev */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="text-sm text-[#A1A1AA] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Prev
          </button>

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="text-sm text-[#A1A1AA] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistTable;

import React from "react";
import DonutChart from "./DonutChart";

const PortfolioTotalCard = () => {
  const portfolioTotal = "$10,275.08";
  const data = [
    { label: "Bitcoin (BTC)", percent: "21.0%", color: "#10B981" },
    { label: "Ethereum (ETH)", percent: "64.6%", color: "#A78BFA" },
    { label: "Solana (SOL)", percent: "14.4%", color: "#60A5FA" },
    { label: "Dogecoin (DOGE)", percent: "14.4%", color: "#18C9DD" },
    { label: "Solana (SOL)", percent: "14.4%", color: "#FB923C" },
    { label: "Solana (SOL)", percent: "14.4%", color: "#FB7185" },
  ];

  return (
    <div className="flex justify-between items-center gap-5 p-6 rounded-xl bg-[#27272A]">
      {/* portfolio total amount and date section */}
      <div className="flex flex-col gap-3 flex-1">
        <h4 className="text-sm font-medium text-[#A1A1AA]">Portfolio Total</h4>
        <h1 className="text-4xl font-semibold text-[#F4F4F5]">
          {portfolioTotal}
        </h1>
        <p className="text-sm font-medium text-[#A1A1AA] mt-24">
          Last updated: 3:42:12 PM
        </p>
      </div>

      {/* portfolio chart and details section */}
      <div className="flex flex-col gap-3 flex-1">
        <h4 className="text-sm font-medium text-[#A1A1AA]">Portfolio Total</h4>

        {/* chart */}
        <div className="flex items-start justify-start gap-5">
          <DonutChart />

          {/* details */}
          <div className="flex flex-col gap-4 w-full">
            {data.map((item) => (
              <div
                key={`${item.label}-${item.percent}-${item.color}`}
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

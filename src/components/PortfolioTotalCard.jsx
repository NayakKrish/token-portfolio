import React from "react";
import DonutChart from "./DonutChart";

const PortfolioTotalCard = () => {
  const portfolioTotal = "$10,275.08";
  return (
    <div className="flex justify-between items-center gap-5 p-6 rounded-xl bg-[#27272A]">
      {/* portfolio total amount and date section */}
      <div className="flex flex-col gap-3 flex-1">
        <h4 className="text-sm font-medium text-[#A1A1AA]">Portfolio Total</h4>
        <h1 className="text-4xl font-semibold text-[#F4F4F5]">{portfolioTotal}</h1>
        <p className="text-sm font-medium text-[#A1A1AA] mt-24">Last updated: 3:42:12 PM</p>
      </div>

      {/* portfolio chart and details section */}
      <div className="flex flex-col gap-3 flex-1">
        <h4 className="text-sm font-medium text-[#A1A1AA]">Portfolio Total</h4>

        {/* chart and details */}
        <DonutChart />
      </div>
    </div>
  );
};

export default PortfolioTotalCard;

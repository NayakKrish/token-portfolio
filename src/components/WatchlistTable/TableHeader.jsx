import React from "react";

const TableHeader = () => {
  const tableHeaderCellClass =
    "text-left text-[#A1A1AA] font-medium text-sm p-4";

  return (
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
  );
};

export default TableHeader;

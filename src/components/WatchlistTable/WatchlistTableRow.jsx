import React from "react";
import { formatPrice, formatChange } from "../utils";
import HoldingsEditor from "./HoldingsEditor";
import TokenActionsMenu from "./TokenActionsMenu";

const WatchlistTableRow = ({
  token,
  editingId,
  editAmount,
  openPopoverId,
  onEditAmountChange,
  onSaveHoldings,
  onEditHoldings,
  onTogglePopover,
  onRemoveToken,
}) => {
  return (
    <tr className="bg-[#212124] hover:bg-[#27272A]">
      {/* Token */}
      <td>
        <div className="flex items-center gap-3">
          <img
            src={token.image}
            alt={token.name}
            className="w-8 h-8 rounded-sm border-0.5 border-[#FFFFFF1A] object-cover"
          />
          <span className="text-xs text-[#F4F4F5] font-normal">
            {token.name}{" "}
            <span className="text-[#A1A1AA] text-sm">({token.symbol})</span>
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
        {token?.data?.sparkline ? (
          <img
            src={token?.data?.sparkline}
            alt={token.name}
            className="w-20 h-5"
          />
        ) : (
          <div className="w-20 h-5 text-center text-[#A1A1AA] text-xs">--</div>
        )}
      </td>

      {/* Holdings */}
      <td>
        <div className="relative w-20">
          <HoldingsEditor
            token={token}
            isEditing={editingId === token.id}
            editAmount={editAmount}
            onEditAmountChange={onEditAmountChange}
            onSave={onSaveHoldings}
            onEdit={onEditHoldings}
          />
        </div>
      </td>

      {/* Value */}
      <td>
        <span className="text-xs text-[#F4F4F5] font-normal">
          {formatPrice(token.value)}
        </span>
      </td>

      {/* More options */}
      <td className="text-right!">
        <TokenActionsMenu
          token={token}
          isOpen={openPopoverId === token.id}
          onToggle={onTogglePopover}
          onEditHoldings={onEditHoldings}
          onRemoveToken={onRemoveToken}
        />
      </td>
    </tr>
  );
};

export default WatchlistTableRow;

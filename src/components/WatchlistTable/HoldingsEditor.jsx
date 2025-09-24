import React from "react";

const HoldingsEditor = ({
  token,
  isEditing,
  editAmount,
  onEditAmountChange,
  onSave,
  onEdit,
}) => {
  if (isEditing) {
    return (
      <>
        {/* Reserve space so column width doesn't change */}
        <div className="invisible text-xs">{token.holdings.toFixed(4)}</div>
        {/* Overlay editor */}
        <div className="absolute inset-0 flex items-center gap-2">
          <input
            type="number"
            step="0.0001"
            value={editAmount}
            onChange={(e) => onEditAmountChange(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-md bg-[#1F1F23] text-[#F4F4F5] text-xs outline-none border border-[#3F3F46] focus:border-[#A9E851]"
          />
          <button
            onClick={() => onSave(token)}
            className="px-2 py-1.5 rounded-md bg-[#A9E851] text-[#18181B] text-xs font-medium hover:bg-[#9BD441] cursor-pointer"
          >
            Save
          </button>
        </div>
      </>
    );
  }

  return (
    <button
      onClick={() => onEdit(token)}
      className="text-xs text-[#F4F4F5] font-normal hover:underline cursor-pointer w-full text-left truncate"
    >
      {token.holdings.toFixed(4)}
    </button>
  );
};

export default HoldingsEditor;

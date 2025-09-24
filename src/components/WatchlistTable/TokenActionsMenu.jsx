import React from "react";
import EllipsisIcon from "../../assets/ellipsis-horizontal.svg";
import EditIcon from "../../assets/edit-icon.svg";
import TrashIcon from "../../assets/trash-icon.svg";

const TokenActionsMenu = ({
  token,
  isOpen,
  onToggle,
  onEditHoldings,
  onRemoveToken,
}) => {
  return (
    <div className="relative popover-container">
      <button
        className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
        onClick={() => onToggle(token.id)}
      >
        <img src={EllipsisIcon} alt="more options" className="w-4 h-4" />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-15 top-0 mt-5 w-40 bg-[#27272A] rounded-lg shadow-lg z-10 py-1">
          {/* Edit Holdings */}
          <button
            onClick={() => onEditHoldings(token)}
            className="w-full px-3 py-2 text-left text-sm text-[#A1A1AA] hover:bg-[#3F3F46] flex items-center gap-2 rounded-md cursor-pointer"
          >
            <img src={EditIcon} alt="edit" />
            Edit Holdings
          </button>

          {/* Separator */}
          <div className="border-t border-[#FFFFFF14] my-1"></div>

          {/* Remove */}
          <button
            onClick={() => onRemoveToken(token.id)}
            className="w-full px-3 py-2 text-left text-sm text-[#FDA4AF] hover:bg-[#3F3F46] flex items-center gap-2 rounded-md cursor-pointer"
          >
            <img src={TrashIcon} alt="remove" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenActionsMenu;

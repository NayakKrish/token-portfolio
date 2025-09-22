import React from "react";
import AppLogo from "../assets/app-logo.svg";
import WalletIcon from "../assets/wallet-icon.svg";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 sticky top-0 bg-[#212124] z-10">
      {/* left side */}
      <div className="flex items-center gap-2">
        {/* App Logo */}
        <img src={AppLogo} alt="App Logo" />
        {/* App Name */}
        <h4 className="text-xl font-semibold">Token Portfolio</h4>
      </div>

      {/* right side */}
      <div className="flex items-center gap-2">
        {/* Action Buttons */}
        <button className="px-3 py-2 rounded-full bg-[#A9E851] flex items-center gap-2 cursor-pointer">
          <img src={WalletIcon} alt="Wallet Icon" className="w-4 h-4" />
          <span className="text-[#18181B] font-medium text-sm">Connect Wallet</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

import React from "react";
import AppLogo from "../assets/app-logo.svg";
import WalletConnectButton from "./WalletConnectButton";

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
        <WalletConnectButton />
      </div>
    </header>
  );
};

export default Navbar;

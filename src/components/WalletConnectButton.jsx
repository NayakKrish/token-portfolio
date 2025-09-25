import { ConnectButton } from "@rainbow-me/rainbowkit";
import WalletIcon from "../assets/wallet-icon.svg";

export default function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="px-3 py-2 rounded-full bg-[#A9E851] flex items-center gap-2 cursor-pointer"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <img
                      src={WalletIcon}
                      alt="Wallet Icon"
                      className="w-4 h-4"
                    />
                    <span className="text-[#18181B] font-medium text-sm">
                      Connect Wallet
                    </span>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div
                  style={{ display: "flex", gap: 12 }}
                  className="flex sm:flex-row flex-col items-center gap-3"
                >
                  <button
                    onClick={openChainModal}
                    className="flex items-center"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className="overflow-hidden rounded-full bg-white mr-2">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="w-5 h-5"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

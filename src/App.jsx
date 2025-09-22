import Navbar from "./components/Navbar";
import PortfolioTotalCard from "./components/PortfolioTotalCard";
import WatchlistComponent from "./components/WatchlistComponent";

function App() {
  return (
    <main className="h-full w-full flex flex-col bg-[#212124]">
      {/* Navbar */}
      <Navbar />

      {/* Portfolio Total amount and chart */}
      <div className="px-6 flex flex-col gap-6 my-4">
        {/* Portfolio Total amount and chart */}
        <PortfolioTotalCard />

        {/* watchlist */}
        <WatchlistComponent />
      </div>
    </main>
  );
}

export default App;

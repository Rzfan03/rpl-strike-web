import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServerInfo from "./components/ServerInfo";
import PlayerSearch from "./components/PlayerSearch";
import PlayerList from "./components/PlayerList";
import LoadingSpinner from "./components/loadingSpinner";
import type { ServerData, SearchResult } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [data, setData] = useState<ServerData | null>(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function initData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/status`);
        const result = await response.json();
        console.log("Data received:", result);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch:", error);
        setData(null);
      }
    }
    initData();
    const interval = setInterval(initData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/search?name=${encodeURIComponent(search)}`
      );
      const result = await response.json();
      console.log("Search result:", result);
      setSearchResult(result);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResult({ is_online: false, matches: [] });
    } finally {
      setIsSearching(false);
    }
  };

  if (!data) {
    return <LoadingSpinner />;
  }

  if (data.status === "offline") {
    return (
      <div className="min-h-screen bg-[#0a0a0b]">
        <Navbar status="offline" />
        <div className="flex items-center justify-center min-h-screen pt-16">
          <div className="text-center space-y-6 bg-gray-900/50 p-12 rounded-2xl border border-red-500/20">
            <h2 className="text-3xl font-bold text-white">Server Offline</h2>
            <p className="text-gray-400 max-w-md">
              Server is currently unavailable. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Navbar status={data.status} />
      <HeroSection
        serverName={data.name}
        playersOnline={data.players_online}
        maxPlayers={data.max_players}
      />
      <ServerInfo data={data} />
      <PlayerSearch
        search={search}
        setSearch={setSearch}
        searchResult={searchResult}
        isSearching={isSearching}
        handleSearch={handleSearch}
      />
      <PlayerList players={data.players} bots={data.bots || []} />
    </div>
  );
}
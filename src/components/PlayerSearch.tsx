import { Search } from "lucide-react";
import type { SearchResult } from "../types";

type PlayerSearchProps = {
  search: string;
  setSearch: (value: string) => void;
  searchResult: SearchResult | null;
  isSearching: boolean;
  handleSearch: (e: React.FormEvent) => void;
}

export default function PlayerSearch({ search, setSearch, searchResult, isSearching, handleSearch }: PlayerSearchProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
        <div className="max-w-xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">Find a Player</h3>
          <p className="text-sm text-gray-400 mb-6">Search for players currently on the server</p>
          
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Player name..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !search.trim()}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors cursor-pointer"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </form>

          {searchResult && (
            <div className="mt-6">
              {searchResult.is_online ? (
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-green-400 font-medium">{searchResult.matches[0].name}</span>
                    </div>
                    <p className="text-green-400 text-sm">Score: {searchResult.matches[0].score}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-red-400 text-sm">Player not found or offline</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
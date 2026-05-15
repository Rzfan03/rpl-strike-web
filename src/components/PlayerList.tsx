import { Trophy, Clock, Bot } from "lucide-react";
import type { Player } from "../types";

type PlayerListProps = {
  players: Player[];
  bots: Player[];
}

function formatTime(seconds: number): string {
  if (!seconds || seconds < 0) return "Just joined";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export default function PlayerList({ players, bots }: PlayerListProps) {
  const allEntities = [
    ...players.map(p => ({ ...p, is_bot: false })),
    ...bots.map(b => ({ ...b, is_bot: true }))
  ].sort((a, b) => b.score - a.score);

  if (allEntities.length === 0) {
    return (
      <div id="players" className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Players Online</h3>
          <p className="text-gray-500">Be the first to join the server</p>
        </div>
      </div>
    );
  }

  return (
    <div id="players" className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Active Players</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-gray-400">{players.length} Players</span>
            </div>
            {bots.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-gray-400">{bots.length} Bots</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-center p-4 text-xs font-medium text-gray-500 uppercase">Kills</th>
                <th className="text-center p-4 text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {allEntities.map((entity, index) => (
                <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <span className={`font-semibold ${
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-300' :
                      index === 2 ? 'text-orange-500' :
                      'text-gray-600'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        entity.is_bot ? 'bg-purple-500/10' : 'bg-gray-800'
                      }`}>
                        {entity.is_bot ? (
                          <Bot className="w-4 h-4 text-purple-400" />
                        ) : (
                          <span className="text-orange-400 text-sm font-medium">
                            {entity.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{entity.name}</span>
                        {entity.is_bot && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                            BOT
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-orange-400 font-semibold">{entity.score}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{formatTime(entity.time)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
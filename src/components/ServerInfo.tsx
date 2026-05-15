import { Map, Zap, Clock, Shield } from "lucide-react";
import type { ServerData } from "../types";

type ServerInfoProps = {
  data: ServerData;
}

export default function ServerInfo({ data }: ServerInfoProps) {
  const cards = [
    { icon: Map, label: "Current Map", value: data.map, color: "text-orange-400" },
    { icon: Zap, label: "Ping", value: `${data.ping}ms`, color: "text-green-400" },
    { icon: Clock, label: "Updated", value: data.updated_at, color: "text-blue-400" },
    { icon: Shield, label: "Status", value: data.status.toUpperCase(), color: "text-purple-400" }
  ];

  return (
    <div id="server" className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Server Information</h2>
        <p className="text-gray-400">Real-time data from our game servers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <card.icon className={`w-6 h-6 ${card.color} mb-4`} />
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-lg font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Copy, Check } from "lucide-react";

type HeroSectionProps = {
  serverName: string;
  playersOnline: number;
  maxPlayers: number;
}

export default function HeroSection({ playersOnline, maxPlayers }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const serverIP = "147.185.221.224:62129";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/50 via-[#0a0a0b]/20 to-[#0a0a0b]" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-20">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tight leading-none">
          RPL STRIKE
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          Experience competitive gaming at its finest. Join our community and dominate the battlefield with the best players around.
        </p>
        <div className="flex items-center justify-center mb-12 md:mb-16 px-4">
          <div className="flex items-stretch bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden w-full max-w-2xl">
            <div className="hidden sm:flex items-center px-6 py-3 border-r border-gray-700 bg-gray-900/50">
              <span className="text-gray-400 text-sm whitespace-nowrap">Server IP</span>
            </div>
            <div className="flex-1 flex items-center px-6 py-3 min-w-0">
              <span className="text-white font-mono font-semibold text-base md:text-lg truncate">{serverIP}</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-5 py-3 bg-gray-800 hover:bg-gray-700 transition-colors border-l border-gray-700 flex-shrink-0"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto px-4">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">{playersOnline}</p>
            <p className="text-xs sm:text-sm text-gray-400">Online</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">{maxPlayers}</p>
            <p className="text-xs sm:text-sm text-gray-400">Slots</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-green-400 mb-1">99%</p>
            <p className="text-xs sm:text-sm text-gray-400">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
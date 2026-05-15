import { useState } from "react";

type NavbarProps = {
  status: string;
}

export default function Navbar({ status }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white tracking-wide">RPL STRIKE</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</a>
            <a href="#server" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Server</a>
            <a href="#players" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Players</a>
            <a href="#search" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Search</a>
             <a href="https://nextclient.ru/" className="text-white hover:text-white transition-colors text-sm bg-orange-500 inset-shadow-2xs inset-shadow-orange-800 p-3 text-center rounded-md">Download CS1.6</a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">Home</a>
              <a href="#server" className="text-gray-300 hover:text-white transition-colors text-sm">Server</a>
              <a href="#players" className="text-gray-300 hover:text-white transition-colors text-sm">Players</a>
              <a href="#search" className="text-gray-300 hover:text-white transition-colors text-sm">Search</a>
               <a href="https://nextclient.ru/" className="text-white hover:text-white transition-colors text-sm bg-orange-500 inset-shadow-2xs inset-shadow-orange-800 p-3 text-center rounded-md">Download CS1.6</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
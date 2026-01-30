'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

export default function IntroPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate navigation on enter/submit, though prompt says "Change location" is non-functional usually, 
    // but here it says "Find your city". The previous logic saved city.
    // I will just route to /home on submit for now to allow entry.
    localStorage.setItem('gof_city', 'Cape Town'); // Defaulting for prototype
    router.push('/home');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between py-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Intro screen.jpg"
          alt="Intro background"
          className="w-full h-full object-cover"
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content (Centered) */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center flex-1 justify-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-white leading-tight drop-shadow-md">
          Small Efforts for a Better World
        </h1>

        <form onSubmit={handleSearch} className="w-full relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find your city"
              className="w-full h-14 pl-12 pr-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all text-lg"
            />
          </div>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center space-y-4 mb-8">
        <p className="text-white/80 font-medium text-sm tracking-wide">
          How will you contribute?
        </p>

        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="bg-lime/20 backdrop-blur-md text-lime-300 border-white/10 hover:bg-lime/30 px-4 py-1.5 h-8 text-sm font-medium">
            Event
          </Badge>
          <Badge variant="secondary" className="bg-sky-500/20 backdrop-blur-md text-sky-200 border-white/10 hover:bg-sky-500/30 px-4 py-1.5 h-8 text-sm font-medium">
            Research
          </Badge>
          <Badge variant="secondary" className="bg-amber-500/20 backdrop-blur-md text-amber-200 border-white/10 hover:bg-amber-500/30 px-4 py-1.5 h-8 text-sm font-medium">
            Webinar
          </Badge>
        </div>

        {/* Invisible clickable area to enter if user doesn't search */}
        <div onClick={() => router.push('/home')} className="absolute inset-0 cursor-default" style={{ zIndex: -1 }}></div>
      </div>
    </div>
  );
}

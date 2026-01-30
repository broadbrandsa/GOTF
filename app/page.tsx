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
    localStorage.setItem('gof_city', 'Cape Town'); // Defaulting for prototype
    router.push('/home');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Intro screen.jpg"
          alt="Intro background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay (Dark bottom -> Clear top) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      {/* Content (Bottom Aligned) */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center space-y-6 animate-in slide-in-from-bottom-8 duration-700 fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white leading-tight drop-shadow-md max-w-xs mx-auto">
          Small Efforts for a Better World
        </h1>

        <form onSubmit={handleSearch} className="w-full max-w-sm relative space-y-4">
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

          <Button
            size="lg"
            className="w-full h-14 rounded-full text-lg font-bold bg-lime text-zinc-900 hover:bg-lime-400 shadow-lg active:scale-[0.98] transition-all"
            onClick={() => router.push('/home')}
          >
            Let's Contribute
          </Button>
        </form>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-3 pt-2">
          <p className="text-white/80 font-medium text-sm tracking-wide">
            How will you contribute?
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="bg-[#B5E28B] text-zinc-900 border-white/10 hover:bg-[#B5E28B]/90 px-4 py-1.5 h-8 text-sm font-medium">
              Event
            </Badge>
            <Badge variant="secondary" className="bg-[#8377DF] text-white border-white/10 hover:bg-[#8377DF]/90 px-4 py-1.5 h-8 text-sm font-medium">
              Research
            </Badge>
            <Badge variant="secondary" className="bg-[#EC956E] text-zinc-900 border-white/10 hover:bg-[#EC956E]/90 px-4 py-1.5 h-8 text-sm font-medium">
              Webinar
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

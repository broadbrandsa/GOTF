'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CITIES } from '@/lib/data';
import { MapPin } from 'lucide-react';

export default function LocationGate() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[0]);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    // Simulate a small delay for "app feel"
    localStorage.setItem('gof_city', selectedCity);
    setTimeout(() => {
      router.push('/home');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=2696&auto=format&fit=crop")', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(250, 250, 247, 0.9)' }}>

      <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-lime rounded-full flex items-center justify-center mb-6 shadow-lg shadow-lime/20">
            <MapPin size={32} className="text-lime-dark/80" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Choose your city</h1>
          <p className="text-muted-foreground text-lg leading-relaxed px-4">
            This helps us show what’s happening near you first.
            You can explore other places later.
          </p>
        </div>

        <Card className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Select location</label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-zinc-50 border border-border appearance-none focus:outline-none focus:ring-2 focus:ring-lime text-base"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Continue'}
          </Button>
        </Card>
      </div>
    </div>
  );
}

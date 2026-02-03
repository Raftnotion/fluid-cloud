"use client";

import React from 'react';

const BRANDS = [
    { name: 'Transistor', logo: 'https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg' },
    { name: 'Reform', logo: 'https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg' },
    { name: 'Tuple', logo: 'https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg' },
    { name: 'SavvyCal', logo: 'https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg' },
    { name: 'Statamic', logo: 'https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg' },
];

export default function TrustCloud() {
    return (
        <div className="bg-black py-8 sm:py-12 md:py-16 border-y border-[#111] overflow-hidden">
            {/* Heading */}
            <div className="px-6 mb-6 sm:mb-8">
                <h2 className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#666]">
                    Trusted by the world's best
                </h2>
            </div>

            {/* Mobile: Infinite Marquee | Desktop: Static Grid */}
            <div className="md:hidden relative">
                {/* Gradient masks for smooth fade */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                {/* Marquee container */}
                <div className="flex animate-marquee">
                    {/* First set of logos */}
                    {BRANDS.map((brand) => (
                        <div key={brand.name} className="flex-shrink-0 px-6">
                            <img
                                alt={brand.name}
                                src={brand.logo}
                                width={120}
                                height={36}
                                className="h-8 w-auto object-contain grayscale opacity-60"
                            />
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {BRANDS.map((brand) => (
                        <div key={`${brand.name}-dup`} className="flex-shrink-0 px-6">
                            <img
                                alt={brand.name}
                                src={brand.logo}
                                width={120}
                                height={36}
                                className="h-8 w-auto object-contain grayscale opacity-60"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop: Static Grid */}
            <div className="hidden md:block mx-auto max-w-5xl px-8">
                <div className="grid grid-cols-5 items-center gap-x-12">
                    {BRANDS.map((brand) => (
                        <img
                            key={brand.name}
                            alt={brand.name}
                            src={brand.logo}
                            width={158}
                            height={48}
                            className="max-h-10 w-full object-contain grayscale opacity-40 hover:opacity-100 transition-opacity duration-300"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

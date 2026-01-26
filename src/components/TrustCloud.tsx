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
        <div className="bg-black py-16 sm:py-20 border-y border-[#111]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-sm font-black uppercase tracking-[0.4em] text-[#333] mb-8">
                    Trusted by the world’s most innovative teams
                </h2>
                <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {BRANDS.map((brand) => (
                        <img
                            key={brand.name}
                            alt={brand.name}
                            src={brand.logo}
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

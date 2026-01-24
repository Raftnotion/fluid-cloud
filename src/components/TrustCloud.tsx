"use client";

import React from 'react';

const BRANDS = [
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
    { name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
    { name: 'Cloudflare', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.svg' },
    { name: 'DigitalOcean', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg' },
    { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
];

const TrustCloud: React.FC = () => {
    return (
        <div className="bg-black py-24 sm:py-32 border-y border-white/5 relative z-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#333]">
                    Trusted by the world&apos;s most innovative infrastructure teams
                </h2>
                <div className="mx-auto mt-12 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
                    {BRANDS.map((brand) => (
                        <img
                            key={brand.name}
                            src={brand.logo}
                            alt={brand.name}
                            className="col-span-2 max-h-8 w-full object-contain grayscale invert opacity-30 hover:opacity-100 transition-opacity lg:col-span-1"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustCloud;

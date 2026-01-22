"use client";

import React from 'react';

interface CSSGlobeProps {
    size?: number;
    color?: string;
}

const CSSGlobe: React.FC<CSSGlobeProps> = ({
    size = 400,
    color = '#CCFF00'
}) => {
    // Generate longitude lines (vertical circles)
    const longitudeLines = Array.from({ length: 12 }, (_, i) => i * 15);

    // Generate latitude lines (horizontal circles)
    const latitudeLines = [-60, -30, 0, 30, 60];

    return (
        <div
            className="relative flex items-center justify-center"
            style={{
                width: size,
                height: size,
                perspective: '1000px',
            }}
        >
            {/* Outer glow */}
            <div
                className="absolute rounded-full"
                style={{
                    width: size * 0.9,
                    height: size * 0.9,
                    background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
                    filter: 'blur(30px)',
                }}
            />

            {/* Main globe container - rotates */}
            <div
                className="absolute animate-spin-slow"
                style={{
                    width: size * 0.7,
                    height: size * 0.7,
                    transformStyle: 'preserve-3d',
                    animationDuration: '25s',
                }}
            >
                {/* Longitude lines (vertical meridians) */}
                {longitudeLines.map((rotation, i) => (
                    <div
                        key={`long-${i}`}
                        className="absolute inset-0 rounded-full border"
                        style={{
                            borderColor: `${color}${i % 2 === 0 ? '30' : '15'}`,
                            borderWidth: '1px',
                            transform: `rotateY(${rotation}deg)`,
                            transformStyle: 'preserve-3d',
                        }}
                    />
                ))}

                {/* Latitude lines (horizontal parallels) */}
                {latitudeLines.map((tilt, i) => (
                    <div
                        key={`lat-${i}`}
                        className="absolute rounded-full border"
                        style={{
                            borderColor: `${color}20`,
                            borderWidth: '1px',
                            width: `${Math.cos(tilt * Math.PI / 180) * 100}%`,
                            height: `${Math.cos(tilt * Math.PI / 180) * 100}%`,
                            left: `${(100 - Math.cos(tilt * Math.PI / 180) * 100) / 2}%`,
                            top: `${50 + Math.sin(tilt * Math.PI / 180) * 50 - (Math.cos(tilt * Math.PI / 180) * 100) / 2}%`,
                            transform: 'rotateX(90deg)',
                            transformStyle: 'preserve-3d',
                        }}
                    />
                ))}

                {/* Equator - brighter line */}
                <div
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                        borderColor: `${color}40`,
                        transform: 'rotateX(90deg)',
                    }}
                />
            </div>

            {/* Central glowing core */}
            <div
                className="absolute rounded-full animate-pulse"
                style={{
                    width: size * 0.15,
                    height: size * 0.15,
                    background: `radial-gradient(circle, ${color}60 0%, ${color}20 50%, transparent 70%)`,
                    boxShadow: `0 0 60px ${color}40, 0 0 100px ${color}20`,
                    animationDuration: '3s',
                }}
            />

            {/* Subtle outer ring */}
            <div
                className="absolute rounded-full border animate-spin-reverse-slow"
                style={{
                    width: size * 0.75,
                    height: size * 0.75,
                    borderColor: `${color}10`,
                    borderWidth: '1px',
                    animationDuration: '40s',
                }}
            />
        </div>
    );
};

export default CSSGlobe;

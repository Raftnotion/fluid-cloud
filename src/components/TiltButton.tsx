"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TiltButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    surfaceColor?: string;
    sideColor?: string;
    textColor?: string;
    width?: string;
    height?: string;
    elevation?: number;
    disabled?: boolean;
}

const TiltButton: React.FC<TiltButtonProps> = ({
    children,
    href,
    onClick,
    className = '',
    surfaceColor = '#CCFF00',
    sideColor = '#99CC00',
    textColor = '#000000',
    width = '100%',
    height = '56px',
    elevation = 6,
    disabled = false,
}) => {
    const [isPressed, setIsPressed] = useState(false);
    const [tiltX, setTiltX] = useState(0);
    const [tiltY, setTiltY] = useState(0);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!buttonRef.current || isPressed) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        setTiltX(deltaY * -4);
        setTiltY(deltaX * 4);
    }, [isPressed]);

    const handleMouseLeave = useCallback(() => {
        setTiltX(0);
        setTiltY(0);
        setIsPressed(false);
    }, []);

    const handleMouseDown = useCallback(() => {
        setIsPressed(true);
        setTiltX(0);
        setTiltY(0);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsPressed(false);
    }, []);

    const currentElevation = isPressed ? 2 : elevation;

    const buttonContent = (
        <div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
            className={`relative cursor-pointer select-none ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
            style={{
                width,
                height,
                perspective: '1000px',
            }}
        >
            {/* 3D Button Container */}
            <motion.div
                className="relative w-full h-full"
                animate={{
                    rotateX: tiltX,
                    rotateY: tiltY,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                }}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Bottom shadow/side */}
                <div
                    className="absolute inset-x-0 rounded-2xl"
                    style={{
                        top: `${currentElevation}px`,
                        bottom: `-${currentElevation}px`,
                        background: sideColor,
                        transition: 'all 0.15s ease',
                    }}
                />

                {/* Main button surface */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-3 rounded-2xl overflow-hidden"
                    animate={{
                        y: isPressed ? currentElevation : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 25,
                    }}
                    style={{
                        background: surfaceColor,
                        boxShadow: isPressed
                            ? `0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)`
                            : `0 ${elevation + 4}px 24px rgba(0,0,0,0.3), 0 ${elevation}px 12px rgba(204,255,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)`,
                    }}
                >
                    {/* Top highlight */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(0,0,0,0.05) 100%)',
                        }}
                    />

                    {/* Button content */}
                    <span
                        className="relative z-10 font-black text-lg md:text-xl uppercase tracking-wider flex items-center gap-2"
                        style={{ color: textColor }}
                    >
                        {children}
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block w-full">
                {buttonContent}
            </Link>
        );
    }

    return buttonContent;
};

export default TiltButton;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enable transpilation for three.js related packages
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;

"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLog {
  id: number;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'scaling' | 'deploy';
  message: string;
}

interface LiveTerminalProps {
  trafficScale: number;
}

const getLogIcon = (type: TerminalLog['type']) => {
  switch (type) {
    case 'info': return '◆';
    case 'warning': return '⚠';
    case 'success': return '✓';
    case 'scaling': return '⚡';
    case 'deploy': return '🔄';
  }
};

const getLogColor = (type: TerminalLog['type']) => {
  switch (type) {
    case 'info': return 'text-[#888888]';
    case 'warning': return 'text-yellow-400';
    case 'success': return 'text-[#CCFF00]';
    case 'scaling': return 'text-blue-400';
    case 'deploy': return 'text-purple-400';
  }
};

// Generate dynamic logs based on traffic scale
const generateLogs = (scale: number, nodeId: number): TerminalLog[] => {
  const now = new Date();
  const formatTime = (offset: number) => {
    const d = new Date(now.getTime() - offset * 1000);
    return d.toLocaleTimeString('en-GB', { hour12: false });
  };

  const percentage = Math.round(scale * 100);
  const containers = Math.max(2, Math.round(scale * 12));
  const baseContainers = 2;

  if (scale < 0.3) {
    return [
      { id: 1, timestamp: formatTime(5), type: 'info', message: 'System monitoring active' },
      { id: 2, timestamp: formatTime(4), type: 'success', message: `CPU usage: ${percentage}% | Normal` },
      { id: 3, timestamp: formatTime(3), type: 'info', message: `Active containers: ${containers}` },
      { id: 4, timestamp: formatTime(2), type: 'success', message: 'All systems operational' },
      { id: 5, timestamp: formatTime(1), type: 'info', message: 'Waiting for traffic...' },
    ];
  } else if (scale < 0.6) {
    return [
      { id: 1, timestamp: formatTime(6), type: 'warning', message: `Traffic increasing: +${Math.round(scale * 200)}%` },
      { id: 2, timestamp: formatTime(5), type: 'scaling', message: `CPU threshold ${percentage}% detected` },
      { id: 3, timestamp: formatTime(4), type: 'deploy', message: `Scaling ${baseContainers} → ${containers} containers` },
      { id: 4, timestamp: formatTime(3), type: 'success', message: `Node wpfye-lon-0${nodeId} online` },
      { id: 5, timestamp: formatTime(2), type: 'success', message: `Node wpfye-lon-0${nodeId + 1} online` },
      { id: 6, timestamp: formatTime(1), type: 'success', message: 'Load balanced successfully' },
    ];
  } else if (scale < 0.85) {
    return [
      { id: 1, timestamp: formatTime(7), type: 'scaling', message: `⚡ Traffic spike: +${Math.round(scale * 340)}%` },
      { id: 2, timestamp: formatTime(6), type: 'deploy', message: `Rapid scaling initiated` },
      { id: 3, timestamp: formatTime(5), type: 'deploy', message: `Scaling ${baseContainers} → ${containers} containers` },
      { id: 4, timestamp: formatTime(4), type: 'success', message: `Node wpfye-lon-0${nodeId} online` },
      { id: 5, timestamp: formatTime(3), type: 'success', message: `Node wpfye-lon-0${nodeId + 1} online` },
      { id: 6, timestamp: formatTime(2), type: 'success', message: `Node wpfye-lon-0${nodeId + 2} online` },
      { id: 7, timestamp: formatTime(1), type: 'success', message: `✓ ${containers} nodes active | Load balanced` },
    ];
  } else {
    return [
      { id: 1, timestamp: formatTime(8), type: 'warning', message: `🔥 PEAK TRAFFIC: +${Math.round(scale * 500)}%` },
      { id: 2, timestamp: formatTime(7), type: 'scaling', message: `Maximum capacity protocol activated` },
      { id: 3, timestamp: formatTime(6), type: 'deploy', message: `Emergency scaling: ${baseContainers} → ${containers}` },
      { id: 4, timestamp: formatTime(5), type: 'success', message: `Node cluster wpfye-lon-04X spinning up` },
      { id: 5, timestamp: formatTime(4), type: 'success', message: `✓ ${containers} containers online` },
      { id: 6, timestamp: formatTime(3), type: 'success', message: `CDN edge nodes: 12 regions active` },
      { id: 7, timestamp: formatTime(2), type: 'success', message: `DDoS mitigation: ACTIVE` },
      { id: 8, timestamp: formatTime(1), type: 'success', message: `💚 All systems operational | 99.99% uptime` },
    ];
  }
};

const LiveTerminal: React.FC<LiveTerminalProps> = ({ trafficScale }) => {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [nodeId, setNodeId] = useState(42);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate new node ID occasionally
    setNodeId(Math.floor(Math.random() * 50) + 40);
    setLogs(generateLogs(trafficScale, nodeId));
  }, [trafficScale]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-[#333333] overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#333333]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca3f]" />
        </div>
        <span className="text-[#666666] text-xs ml-2">wpfye-cluster-monitor</span>
        <div className="ml-auto flex items-center gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full bg-[#CCFF00]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[#CCFF00] text-xs">LIVE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="p-4 h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log, index) => (
            <motion.div
              key={`${log.id}-${trafficScale.toFixed(2)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="flex items-start gap-3 mb-2 leading-relaxed"
            >
              <span className="text-[#444444] shrink-0">[{log.timestamp}]</span>
              <span className={`${getLogColor(log.type)} shrink-0`}>{getLogIcon(log.type)}</span>
              <span className="text-[#F2F2F2]">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor blink */}
        <motion.div
          className="flex items-center gap-2 mt-2"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-[#CCFF00]">$</span>
          <span className="w-2 h-4 bg-[#CCFF00]" />
        </motion.div>
      </div>
    </div>
  );
};

export default LiveTerminal;

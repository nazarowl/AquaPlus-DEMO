'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  steps: string[];
  active: number; // 1-based
}

export default function ProgressBar({ steps, active }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 py-4 flex-wrap">
      {steps.map((label, i) => {
        const num = i + 1;
        const isDone = num < active;
        const isActive = num === active;
        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isDone ? '#28A745' : isActive ? '#238DC1' : '#E0E0E0',
                  color: isDone || isActive ? '#fff' : '#6C6E70',
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              >
                {isDone ? '✓' : num}
              </motion.div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-text-dark font-semibold' : 'text-text-secondary'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-10 h-0.5 transition-colors ${
                  num < active ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

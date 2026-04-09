'use client';

import { useToastStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast() {
  const { message, visible } = useToastStore();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-20 right-5 z-[80] bg-navy text-white px-6 py-3.5 rounded-lg shadow-xl text-sm font-medium"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

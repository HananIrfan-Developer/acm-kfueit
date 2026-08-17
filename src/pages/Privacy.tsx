import { motion } from 'motion/react';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-bold mb-8 text-white">PRIVACY POLICY</h1>
        <div className="space-y-6 text-slate-300">
          <p>Read our privacy policy to learn how we collect, use, and protect your data.</p>
        </div>
      </motion.div>
    </div>
  );
}

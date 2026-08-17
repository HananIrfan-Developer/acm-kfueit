import { motion } from 'motion/react';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-bold mb-8 text-white">TERMS & CONDITIONS</h1>
        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-blue-400 mb-2">1. INTRODUCTION</h2>
            <p>These Terms & Conditions govern your use of the ACM KFUEIT website. By accessing this website, you agree to comply with these terms.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-blue-400 mb-2">2. USE OF WEBSITE</h2>
            <p>You agree to use this website for lawful purposes only and in a way that does not infringe the rights of others.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-blue-400 mb-2">3. INTELLECTUAL PROPERTY</h2>
            <p>All content, logos, and materials on this website are the property of ACM KFUEIT unless otherwise stated.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

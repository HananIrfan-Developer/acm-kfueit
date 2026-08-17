import { motion } from 'motion/react';
import { Target, Lightbulb, Users, Shield, Zap, Globe, Award, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  const sections = [
    { icon: <Target className="text-blue-400" size={32} />, title: 'Our Mission', desc: 'To advance computing as a science and profession and to empower students through knowledge sharing and collaboration.' },
    { icon: <Lightbulb className="text-yellow-400" size={32} />, title: 'Our Vision', desc: 'To be a leading student chapter that inspires innovation, excellence and positive impact in the computing community.' },
  ];

  const whatWeDo = [
    { icon: <Globe />, title: 'Organize & Seminars' },
    { icon: <Zap />, title: 'Technical Trainings' },
    { icon: <Shield />, title: 'Competitions & Hackathons' },
    { icon: <Users />, title: 'Community Collaboration' },
    { icon: <Target />, title: 'Projects & Research' },
  ];

  const values = [
    { title: 'Innovation', desc: 'Pushing boundaries in technology.' },
    { title: 'Excellence', desc: 'Striving for the highest quality.' },
    { title: 'Inclusivity', desc: 'Welcoming all tech enthusiasts.' }
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6 uppercase tracking-tight">ABOUT ACM KFUEIT</h1>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                ACM KFUEIT is the official student chapter of the Association for Computing Machinery at Khwaja Fareed University of Engineering & Information Technology, Rahim Yar Khan.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                We bring together students who are passionate about computing to learn, share, innovate and grow together.
              </p>
              <Link to="/join" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Join ACM
              </Link>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden glass-panel">
              <img loading="lazy" src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000" alt="About ACM" className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-24 relative bg-[#060b24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel p-10 rounded-3xl group hover:border-blue-500/50 transition-colors">
                <div className="mb-6 bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-700">{s.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-24 relative border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-12 uppercase tracking-wider">OUR CORE VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-8 rounded-3xl">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6"><Award size={24}/></div>
                <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                <p className="text-slate-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What We Do */}
      <section className="py-24 relative border-t border-white/5 bg-[#060b24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-wider">WHAT WE DO</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {whatWeDo.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:bg-blue-900/20 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 5. ACM AT KFUEIT / Overview */}
      <section className="py-24 bg-[#050b1a] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 uppercase">ACM AT KFUEIT</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Our chapter plays a vital role in building a strong computing community by organizing events, technical sessions and collaborative activities that help students enhance their skills, explore new technologies and develop professional excellence.
              </p>
              <ul className="space-y-4">
                {['Skill Development', 'Knowledge Sharing', 'Innovation & Research', 'Community Building'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full box-glow"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel p-2">
              <img loading="lazy" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Students" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Chapter History */}
      <section className="py-24 relative border-t border-white/5 bg-[#020617]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">OUR JOURNEY</h2>
          <div className="glass-panel p-10 rounded-3xl text-left relative">
            <div className="absolute top-10 left-10 opacity-10"><Clock size={100} className="text-blue-500"/></div>
            <p className="text-slate-300 leading-relaxed relative z-10 mb-6">
              Since its inception, the ACM KFUEIT Chapter has grown from a small group of tech enthusiasts to the largest computing society on campus. We have continuously strived to bridge the gap between academic learning and industry demands.
            </p>
            <p className="text-slate-300 leading-relaxed relative z-10">
              Through hundreds of workshops, national-level hackathons, and seminars, we have empowered thousands of students, fostering an environment of perpetual learning and unbridled innovation.
            </p>
          </div>
        </div>
      </section>
      
      {/* 7. Call to action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-900 text-center relative overflow-hidden border-t border-blue-500/20">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Be a part of our journey towards a smarter future.</h2>
          <Link to="/join" className="inline-block px-10 py-4 bg-white text-blue-900 rounded-lg font-bold hover:scale-105 transition-transform shadow-2xl">
            Join ACM KFUEIT Today
          </Link>
        </div>
      </section>
    </div>
  );
}

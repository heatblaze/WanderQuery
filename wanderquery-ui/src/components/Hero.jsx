import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import { Plane } from 'lucide-react';

export default function Hero({ onSearch, isLoading }) {
  const airplanes = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    duration: 15 + i * 5,
    delay: i * 2,
    top: 10 + i * 20,
  }));

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 gradient-sky" />

      {airplanes.map((plane) => (
        <motion.div
          key={plane.id}
          initial={{ x: '-100px', opacity: 0 }}
          animate={{ x: 'calc(100vw + 100px)', opacity: [0, 0.3, 0.3, 0] }}
          transition={{
            duration: plane.duration,
            delay: plane.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ top: `${plane.top}%` }}
          className="absolute pointer-events-none"
        >
          <Plane size={32} className="text-cyan-400/40" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <span className="text-6xl">✈️</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              WanderQuery
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-4 font-light">
            Discover flight routes that connect the world
          </p>

          <p className="text-slate-400 text-sm">
            Explore any flight connection with our AI-powered intelligent search engine
          </p>
        </motion.div>

        <SearchBar onSearch={onSearch} isLoading={isLoading} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-6 text-center max-w-md mx-auto"
        >
          {[
            { number: '1000+', label: 'Routes' },
            { number: '500+', label: 'Airlines' },
            { number: '200+', label: 'Airports' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="glass-dark rounded-xl p-4"
            >
              <p className="text-2xl font-bold text-cyan-400">{stat.number}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

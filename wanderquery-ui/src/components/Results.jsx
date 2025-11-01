import { motion } from 'framer-motion';
import FlightCard from './FlightCard';
import { Globe } from 'lucide-react';

export default function Results({ results, loading, searchParams }) {
  if (!searchParams) {
    return null;
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12"
      >
        <div className="text-center py-16">
          <motion.div
            animate={{ x: [0, 400, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <div className="text-4xl text-cyan-400">✈️</div>
          </motion.div>
          <p className="text-slate-300 text-lg font-semibold">Finding the best routes for you...</p>
          <p className="text-slate-500 text-sm mt-2">Hold tight while we search the skies</p>
        </div>
      </motion.div>
    );
  }

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12"
      >
        <div className="text-center py-16">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Globe size={64} className="text-slate-500 mx-auto" />
          </motion.div>
          <p className="text-slate-300 text-lg font-semibold">No routes found</p>
          <p className="text-slate-500 text-sm mt-2">
            We couldn't find flights from <span className="text-cyan-300">{searchParams.source}</span> to <span className="text-cyan-300">{searchParams.destination}</span>
          </p>
          <p className="text-slate-600 text-sm mt-4">Try searching with different cities</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Found <span className="text-cyan-400">{results.length}</span> Route{results.length !== 1 ? 's' : ''}
        </h2>
        <p className="text-slate-400">
          From <span className="text-cyan-300 font-semibold">{searchParams.source}</span> to <span className="text-cyan-300 font-semibold">{searchParams.destination}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((flight, index) => (
          <FlightCard key={index} flight={flight} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

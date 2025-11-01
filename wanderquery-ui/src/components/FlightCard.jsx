import { motion } from 'framer-motion';
import { Plane, MapPin, Zap } from 'lucide-react';

export default function FlightCard({ flight, index }) {
  const stopsText = flight.stops === '0' ? 'Direct Flight' : `${flight.stops} Stop${flight.stops !== '1' ? 's' : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group glass-dark rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 25, scale: 1.1 }}
              className="text-cyan-400"
            >
              <Plane size={28} />
            </motion.div>
            <div>
              <p className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {flight.airline}
              </p>
              <p className="text-sm text-slate-400">{flight.equipment}</p>
            </div>
          </div>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-400"
          >
            <Zap size={20} />
          </motion.div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs text-slate-400 mb-1">From</p>
            <p className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin size={16} className="text-cyan-400" />
              {flight.source}
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent relative">
              <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400" size={20} />
            </div>
          </div>

          <div className="flex-1 text-right">
            <p className="text-xs text-slate-400 mb-1">To</p>
            <p className="text-lg font-semibold text-white flex items-center justify-end gap-2">
              {flight.destination}
              <MapPin size={16} className="text-cyan-400" />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Flight Type</p>
            <p className="font-semibold text-cyan-300">{stopsText}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Aircraft</p>
            <p className="font-semibold text-blue-300">{flight.equipment}</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-b-2xl origin-left"
      />
    </motion.div>
  );
}

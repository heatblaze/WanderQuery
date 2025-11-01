import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const SAMPLE_CITIES = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
  'New York', 'Los Angeles', 'London', 'Paris', 'Singapore',
  'Tokyo', 'Sydney', 'Dubai', 'Bangkok', 'Toronto'
];

export default function SearchBar({ onSearch, isLoading }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const handleFromChange = (value) => {
    setFrom(value);
    if (value.length > 0) {
      const filtered = SAMPLE_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (value) => {
    setTo(value);
    if (value.length > 0) {
      const filtered = SAMPLE_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (from.trim() && to.trim()) {
      onSearch({ source: from, destination: to });
      setShowFromSuggestions(false);
      setShowToSuggestions(false);
    }
  };

  const selectFrom = (city) => {
    setFrom(city);
    setShowFromSuggestions(false);
  };

  const selectTo = (city) => {
    setTo(city);
    setShowToSuggestions(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full"
    >
      <form onSubmit={handleSearch} className="w-full">
        <div className="glass-dark rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                From
              </label>
              <input
                type="text"
                value={from}
                onChange={(e) => handleFromChange(e.target.value)}
                onFocus={() => from.length > 0 && setShowFromSuggestions(true)}
                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                placeholder="Departure city"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-lg border border-slate-700 shadow-lg z-10 max-h-48 overflow-y-auto"
                >
                  {fromSuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => selectFrom(city)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                To
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => handleToChange(e.target.value)}
                onFocus={() => to.length > 0 && setShowToSuggestions(true)}
                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                placeholder="Destination city"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-lg border border-slate-700 shadow-lg z-10 max-h-48 overflow-y-auto"
                >
                  {toSuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => selectTo(city)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !from.trim() || !to.trim()}
            whileHover={!isLoading && from.trim() && to.trim() ? { scale: 1.05 } : {}}
            whileTap={!isLoading && from.trim() && to.trim() ? { scale: 0.98 } : {}}
            className="w-full glow-button bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <>
                <div className="animate-spin">
                  <Search size={20} />
                </div>
                Searching...
              </>
            ) : (
              <>
                <Search size={20} />
                Search Flights
              </>
            )}
          </motion.button>

          <p className="text-center text-slate-400 text-sm">
            Try <span className="text-cyan-300 font-semibold">Delhi → Mumbai</span> or <span className="text-cyan-300 font-semibold">New York → London</span>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

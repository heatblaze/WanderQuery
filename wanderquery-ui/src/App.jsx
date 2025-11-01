import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Results from './components/Results';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async ({ source, destination }) => {
    setLoading(true);
    setError(null);
    setSearchParams({ source, destination });

    try {
      const response = await axios.get('http://127.0.0.1:8000/search', {
        params: {
          source,
          destination,
        },
      });

      setResults(response.data || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch flight routes. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="pt-20">
        <Hero onSearch={handleSearch} isLoading={loading} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {error && (
            <div className="mt-12 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}
          <Results results={results} loading={loading} searchParams={searchParams} />
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default App;

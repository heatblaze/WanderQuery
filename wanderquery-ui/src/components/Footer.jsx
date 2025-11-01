import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-lg mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              WanderQuery
            </h3>
            <p className="text-slate-400 text-sm">
              Discover flight routes that connect the world. Your intelligent travel companion for exploring global aviation networks.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">API Docs</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Social</h4>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-500 text-sm">
            Made with <span className="text-red-500">❤️</span> by <span className="text-cyan-400 font-semibold">Aditya Chitransh</span> | WanderQuery 2025
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

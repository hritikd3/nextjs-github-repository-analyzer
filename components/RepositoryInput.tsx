'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RepositoryInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export default function RepositoryInput({ onAnalyze, loading }: RepositoryInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass rounded-2xl p-8 neon-border">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center"
          >
            <Github className="w-8 h-8 text-gray-900" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Repository Analyzer
          </h1>
          <p className="text-gray-400">
            Paste any GitHub repository URL to unlock advanced insights and visualizations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="https://github.com/owner/repository"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-12 h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
              disabled={loading}
            />
          </div>
          
          <Button
            type="submit"
            disabled={!url.trim() || loading}
            className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium text-lg transition-all duration-300 glow"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Search className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Analyze Repository
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Try: facebook/react, microsoft/vscode, or vercel/next.js
          </p>
        </div>
      </div>
    </motion.div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import RepositoryInput from '@/components/RepositoryInput';
import RepositoryDashboard from '@/components/RepositoryDashboard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AnalyzedRepo } from '@/types/github';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzedRepo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeRepository = async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze repository');
      }

      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen cyber-grid">
      <div className="container mx-auto px-4 py-12">
        {!data && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[80vh]"
          >
            <RepositoryInput onAnalyze={analyzeRepository} loading={loading} />
          </motion.div>
        )}

        {loading && <LoadingSpinner />}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 border border-red-500/50">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Analysis Failed</h3>
                  <p className="text-sm text-gray-300 mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={() => setError(null)}
                className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {data && (
          <div className="space-y-6">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setData(null)}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 mb-8"
            >
              ← Analyze Another Repository
            </motion.button>
            <RepositoryDashboard data={data} />
          </div>
        )}
      </div>
    </main>
  );
}
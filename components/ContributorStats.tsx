'use client';

import { motion } from 'framer-motion';
import { GitHubContributor } from '@/types/github';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ContributorStatsProps {
  contributors: GitHubContributor[];
}

export default function ContributorStats({ contributors }: ContributorStatsProps) {
  const chartData = contributors.slice(0, 8).map(contributor => ({
    name: contributor.login,
    contributions: contributor.contributions,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 neon-border"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Top Contributors</h3>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="contributionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Bar 
              dataKey="contributions" 
              fill="url(#contributionGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {contributors.slice(0, 5).map((contributor, index) => (
          <motion.div
            key={contributor.login}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors"
          >
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-8 h-8 rounded-full border border-cyan-400"
            />
            <div className="flex-1">
              <div className="text-white font-medium">{contributor.login}</div>
              <div className="text-sm text-gray-400">{contributor.contributions} contributions</div>
            </div>
            <div className="text-cyan-400 font-bold">
              #{index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
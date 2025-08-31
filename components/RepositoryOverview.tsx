'use client';

import { motion } from 'framer-motion';
import { GitHubRepo } from '@/types/github';
import { Star, GitFork, Eye, AlertCircle, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RepositoryOverviewProps {
  repo: GitHubRepo;
  summary: string;
}

export default function RepositoryOverview({ repo, summary }: RepositoryOverviewProps) {
  const stats = [
    { label: 'Stars', value: repo.stargazers_count.toLocaleString(), icon: Star, color: 'text-yellow-400' },
    { label: 'Forks', value: repo.forks_count.toLocaleString(), icon: GitFork, color: 'text-blue-400' },
    { label: 'Watchers', value: repo.watchers_count.toLocaleString(), icon: Eye, color: 'text-green-400' },
    { label: 'Issues', value: repo.open_issues_count.toLocaleString(), icon: AlertCircle, color: 'text-red-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 neon-border"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-6">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="w-16 h-16 rounded-full border-2 border-cyan-400 glow"
            />
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{repo.name}</h2>
              <p className="text-cyan-400 font-medium">{repo.owner.login}</p>
              <p className="text-gray-300 mt-2">{repo.description}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">AI Summary</h3>
            <p className="text-gray-300">{summary}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
            >
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            {repo.homepage && (
              <Button
                asChild
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="lg:w-80">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gray-800/50 rounded-xl p-4 text-center"
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Language:</span>
              <span className="text-white font-medium">{repo.language || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Size:</span>
              <span className="text-white font-medium">{(repo.size / 1024).toFixed(1)} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Created:</span>
              <span className="text-white font-medium">
                {new Date(repo.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Push:</span>
              <span className="text-white font-medium">
                {new Date(repo.pushed_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
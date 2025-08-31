'use client';

import { motion } from 'framer-motion';
import { CommitActivity } from '@/types/github';

interface ContributionHeatmapProps {
  activity: CommitActivity[];
}

export default function ContributionHeatmap({ activity }: ContributionHeatmapProps) {
  const getColorForLevel = (level: number) => {
    const colors = [
      'bg-gray-800',
      'bg-cyan-900/50',
      'bg-cyan-700/70',
      'bg-cyan-500/80',
      'bg-cyan-400',
    ];
    return colors[level] || colors[0];
  };

  const weeks = [];
  for (let i = 0; i < activity.length; i += 7) {
    weeks.push(activity.slice(i, i + 7));
  }

  const maxCommits = Math.max(...activity.map(day => day.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 neon-border"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Contribution Activity</h3>
        <div className="text-sm text-gray-400">
          Last 365 days • Max: {maxCommits} commits/day
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-fit">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  className={`w-3 h-3 rounded-sm ${getColorForLevel(day.level)} transition-all duration-200 hover:scale-125 cursor-pointer`}
                  title={`${day.date}: ${day.count} commits`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getColorForLevel(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { GitHubLanguages } from '@/types/github';

interface TechStackRadarProps {
  languages: GitHubLanguages;
}

export default function TechStackRadar({ languages }: TechStackRadarProps) {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  
  const data = Object.entries(languages)
    .map(([language, bytes]) => ({
      language,
      percentage: Math.round((bytes / total) * 100),
      bytes,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 8); // Top 8 languages

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6 neon-border"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <PolarGrid stroke="rgba(56, 189, 248, 0.2)" />
            <PolarAngleAxis 
              dataKey="language" 
              tick={{ fill: '#fff', fontSize: 12 }}
              className="text-white"
            />
            <PolarRadiusAxis
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickCount={6}
              domain={[0, Math.max(...data.map(d => d.percentage))]}
            />
            <Radar
              name="Usage"
              dataKey="percentage"
              stroke="#38bdf8"
              fill="url(#radarGradient)"
              strokeWidth={2}
              dot={{ fill: '#38bdf8', strokeWidth: 2, r: 4 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-2">
        {data.slice(0, 5).map((lang, index) => (
          <motion.div
            key={lang.language}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex justify-between items-center"
          >
            <span className="text-gray-300 font-medium">{lang.language}</span>
            <span className="text-cyan-400 font-bold">{lang.percentage}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
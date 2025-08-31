'use client';

import { motion } from 'framer-motion';
import { AnalyzedRepo } from '@/types/github';
import RepositoryOverview from './RepositoryOverview';
import TechStackRadar from './TechStackRadar';
import ContributionHeatmap from './ContributionHeatmap';
import DependencyGraph from './DependencyGraph';
import ContributorStats from './ContributorStats';

interface RepositoryDashboardProps {
  data: AnalyzedRepo;
}

export default function RepositoryDashboard({ data }: RepositoryDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto space-y-8"
    >
      <RepositoryOverview repo={data.repo} summary={data.summary} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TechStackRadar languages={data.languages} />
        <ContributorStats contributors={data.contributors} />
      </div>

      <ContributionHeatmap activity={data.commitActivity} />
      
      <DependencyGraph contents={data.contents} />
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import DailyRewards from '../components/rewards/DailyRewards';
import ReferralProgram from '../components/rewards/ReferralProgram';
import SponsorTasks from '../components/sponsors/SponsorTasks';
import TabNavigation from '../components/rewards/TabNavigation';

const Earn = () => {
  const [activeTab, setActiveTab] = React.useState<'daily' | 'sponsor'>('daily');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      {/* Header */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500">
            <Gift size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Earn Points</h1>
            <p className="text-gray-400">Complete tasks to earn points</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === 'daily' ? (
        <div className="space-y-4">
          <ReferralProgram />
          <DailyRewards />
        </div>
      ) : (
        <SponsorTasks />
      )}
    </motion.div>
  );
};

export default Earn;
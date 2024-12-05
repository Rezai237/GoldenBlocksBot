import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useSponsorStore } from '../../stores/sponsorStore';
import SponsorTask from './SponsorTask';
import { useNavigate } from 'react-router-dom';

const SponsorTasks = () => {
  const navigate = useNavigate();
  const { getActiveSponsorTasks } = useSponsorStore();
  const tasks = getActiveSponsorTasks();

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <Briefcase className="mx-auto mb-3 text-gray-500" size={24} />
        <p className="text-gray-400">No sponsor tasks available</p>
        <p className="text-sm text-gray-500 mt-1">Check back later for new tasks!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <SponsorTask
          key={task.id}
          task={task}
          onStart={() => {
            // Navigate to the appropriate game or task
            if (task.requirements.type === 'play') {
              navigate('/games');
            }
          }}
        />
      ))}
    </div>
  );
};

export default SponsorTasks;
import React from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../stores/adminStore';
import { formatDistanceToNow } from 'date-fns';

const UserActivityTable = () => {
  const { getUserActivities } = useAdminStore();
  const activities = getUserActivities();

  return (
    <div className="glass-panel p-4 overflow-hidden">
      <h2 className="text-lg font-bold mb-4">Recent User Activity</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="pb-2">User</th>
              <th className="pb-2">Last Active</th>
              <th className="pb-2">Score</th>
              <th className="pb-2">Tokens</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <motion.tr
                key={activity.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-gray-800"
              >
                <td className="py-2">{activity.username}</td>
                <td className="py-2 text-gray-400">
                  {formatDistanceToNow(activity.lastActive, { addSuffix: true })}
                </td>
                <td className="py-2">{activity.totalScore.toLocaleString()}</td>
                <td className="py-2 text-yellow-400">
                  {activity.tokensEarned.toFixed(2)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActivityTable;
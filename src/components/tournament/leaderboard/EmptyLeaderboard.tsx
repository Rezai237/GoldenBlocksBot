import React from 'react';
import { Trophy } from 'lucide-react';

const EmptyLeaderboard: React.FC = () => {
  return (
    <div className="text-center py-8">
      <Trophy className="mx-auto mb-3 text-gray-500" size={24} />
      <p className="text-gray-400">No participants yet</p>
      <p className="text-sm text-gray-500 mt-1">
        Be the first to join!
      </p>
    </div>
  );
};

export default React.memo(EmptyLeaderboard);
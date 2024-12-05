import React from 'react';
import { Trophy } from 'lucide-react';

interface Props {
  title: string;
  description: string;
}

const TournamentTitle: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
        <Trophy size={24} className="text-black" />
      </div>
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default React.memo(TournamentTitle);
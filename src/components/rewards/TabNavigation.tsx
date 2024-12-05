import React from 'react';
import clsx from 'clsx';

interface Props {
  activeTab: 'daily' | 'sponsor';
  onChange: (tab: 'daily' | 'sponsor') => void;
}

const TabNavigation: React.FC<Props> = ({ activeTab, onChange }) => {
  return (
    <div className="flex space-x-2 mb-6">
      <button
        onClick={() => onChange('daily')}
        className={clsx(
          'flex-1 py-2 px-4 rounded-lg transition-colors',
          activeTab === 'daily'
            ? 'bg-yellow-400 text-black'
            : 'glass-panel text-gray-400'
        )}
      >
        Daily Tasks
      </button>
      <button
        onClick={() => onChange('sponsor')}
        className={clsx(
          'flex-1 py-2 px-4 rounded-lg transition-colors',
          activeTab === 'sponsor'
            ? 'bg-purple-400 text-black'
            : 'glass-panel text-gray-400'
        )}
      >
        Sponsor Tasks
      </button>
    </div>
  );
};

export default React.memo(TabNavigation);
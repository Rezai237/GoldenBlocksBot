import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../stores/adminStore';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminDashboardStats from '../../components/admin/AdminDashboardStats';
import AdminGameAnalytics from '../../components/admin/AdminGameAnalytics';
import AdminUserActivity from '../../components/admin/AdminUserActivity';
import AdminTournamentStats from '../../components/admin/AdminTournamentStats';

const AdminDashboard = () => {
  const { stats, gameStats, getUserActivities, refreshStats } = useAdminStore();
  const activities = getUserActivities(50);

  useEffect(() => {
    refreshStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(refreshStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshStats]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      <AdminHeader onRefresh={refreshStats} />
      <AdminDashboardStats stats={stats} />
      <AdminGameAnalytics stats={gameStats} />
      <AdminTournamentStats />
      <AdminUserActivity activities={activities} />
    </motion.div>
  );
};

export default AdminDashboard;
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, ExternalLink } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { hapticFeedback } from '../../utils/telegram';

const ReferralProgram = () => {
  const { user } = useUserStore();
  const [showCopied, setShowCopied] = React.useState(false);

  const handleShare = async () => {
    hapticFeedback.impact('medium');
    
    const referralCode = user?.id || '';
    const shareUrl = `https://t.me/GoldenBlocksBot?start=${referralCode}`;
    
    try {
      // Try to use the native share API first
      if (navigator.share) {
        await navigator.share({
          title: 'Join Golden Blocks',
          text: `🎮 Join me in Golden Blocks and earn points! Use my referral code: ${referralCode}`,
          url: shareUrl
        });
        return;
      }

      // Fallback to clipboard copy
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      hapticFeedback.notification('success');
      
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (error) {
      console.warn('Share failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-4"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500">
          <Share2 size={24} className="text-black" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold">Refer Friends</h3>
          <p className="text-sm text-gray-400">
            Earn 100 points per referral
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-400/20 text-blue-400 hover:bg-blue-400/30"
        >
          {showCopied ? (
            <>
              <Copy size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <ExternalLink size={16} />
              <span>Share</span>
            </>
          )}
        </motion.button>
      </div>

      {user?.id && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Your Referral Code:</span>
            <span className="font-mono text-blue-400">{user.id}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(ReferralProgram);
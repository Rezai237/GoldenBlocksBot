import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  console.log('Rendering LoadingSpinner');
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mb-4"
        />
        <div className="text-yellow-400 text-lg">
          Loading...
        </div>
        {import.meta.env.DEV && (
          <div className="text-gray-500 text-sm mt-2">
            Development Mode
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;

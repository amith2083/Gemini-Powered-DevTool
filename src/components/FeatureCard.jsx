import { motion } from "framer-motion";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="bg-white shadow-2xl rounded-3xl p-8 backdrop-blur-lg bg-opacity-80 border border-gray-300 text-gray-900"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;

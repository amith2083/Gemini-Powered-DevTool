import { useNavigate } from "react-router-dom";
import { FaRobot, FaCode, FaLock, FaGithub, FaLightbulb, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";


function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg transform -rotate-12 mb-6">
              <FaRobot className="w-12 h-12 text-white mx-auto transform translate-y-4" />
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl font-bold mb-6 bg-black text-transparent bg-clip-text"
          >
           Supercharge Your Coding with AI Intelligence
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Get intelligent suggestions, optimize performance, and write better software with an AI assistant tailored for developers.
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700
                       text-white rounded-xl font-semibold text-lg flex items-center gap-3 transform hover:-translate-y-1
                       transition-all duration-200 shadow-lg hover:shadow-2xl"
            >
              <FaRobot className="text-xl" />
              Start Coding Now
              <span className="inline-block animate-bounce">→</span>
            </button>
            <a
              href="https://github.com/amith2083"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-lg
                       text-white rounded-xl font-semibold text-lg flex items-center gap-3
                       transform hover:-translate-y-1 transition-all duration-200 border border-gray-700"
            >
              <FaGithub className="text-xl" />
              View on GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          <FeatureCard
            icon={<FaBrain />}
            title="AI-Powered Intelligence"
            description="Unleash the power of AI in your coding workflow. Our smart assistant understands your code in real time, providing intelligent suggestions, autocomplete, and contextual insights to supercharge your productivity."
            gradient="from-teal-500 to-teal-700"
          />
          <FeatureCard
            icon={<FaLightbulb />}
            title="Smart Solutions"
            description="Say goodbye to debugging nightmares! Get instant, AI-driven solutions for optimization, performance tuning, and best coding practices—across all programming languages, frameworks, and tech stacks."
            gradient="from-cyan-500 to-cyan-700"
          />
          <FeatureCard
            icon={<FaLock />}
            title="Secure & Private"
            description="Your code, your rules! With top-tier encryption and strict privacy measures, your data remains protected. Code freely with the confidence that your work stays secure and confidential."
            gradient="from-blue-500 to-blue-700"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Landing;

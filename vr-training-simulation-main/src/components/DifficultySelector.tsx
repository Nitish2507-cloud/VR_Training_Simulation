import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Flame, Zap, Skull } from "lucide-react";

interface DifficultySelectorProps {
  simulationTitle: string;
  onSelect: (difficulty: string) => void;
  onBack: () => void;
}

const difficulties = [
  {
    level: "Low",
    icon: Shield,
    description: "Beginner-friendly scenarios with guided assistance",
    color: "from-green-400 to-emerald-500",
    borderColor: "border-green-500/50",
    hoverShadow: "hover:shadow-green-500/30",
  },
  {
    level: "Medium",
    icon: Flame,
    description: "Standard difficulty with moderate challenges",
    color: "from-yellow-400 to-orange-500",
    borderColor: "border-yellow-500/50",
    hoverShadow: "hover:shadow-yellow-500/30",
  },
  {
    level: "Moderate",
    icon: Zap,
    description: "Advanced scenarios requiring quick decision-making",
    color: "from-orange-500 to-red-500",
    borderColor: "border-orange-500/50",
    hoverShadow: "hover:shadow-orange-500/30",
  },
  {
    level: "High",
    icon: Skull,
    description: "Expert-level challenges with minimal guidance",
    color: "from-red-500 to-pink-600",
    borderColor: "border-red-500/50",
    hoverShadow: "hover:shadow-red-500/30",
  },
];

const DifficultySelector = ({ simulationTitle, onSelect, onBack }: DifficultySelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-neon mb-2">
            Select Difficulty
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            {simulationTitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {difficulties.map((diff, index) => (
            <motion.div
              key={diff.level}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => onSelect(diff.level)}
                className={`w-full p-6 rounded-2xl border ${diff.borderColor} bg-gradient-card
                  transition-all duration-300 hover:scale-105 ${diff.hoverShadow} hover:shadow-lg
                  group text-left`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${diff.color} 
                    flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <diff.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {diff.level}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {diff.description}
                </p>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Button variant="outline" onClick={onBack} className="px-8">
            Back to Simulations
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DifficultySelector;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Flame, Droplets, Wind, Mountain, Zap, Shield } from "lucide-react";
import DifficultySelector from "@/components/DifficultySelector";
import SimulationPlayer, { type SimulationStats } from "@/components/SimulationPlayer";
import PerformanceFeedback from "@/components/PerformanceFeedback";
import { auth } from "@/lib/firebase";

type SimulationPhase = "list" | "difficulty" | "playing" | "feedback";

interface Simulation {
  id: number;
  title: string;
  description: string;
  icon: typeof Flame;
  difficulty: string;
  duration: string;
  color: string;
}

const simulations: Simulation[] = [
  {
    id: 1,
    title: "Fire Emergency",
    description: "Learn to handle building fires, evacuations, and firefighting basics.",
    icon: Flame,
    difficulty: "Beginner",
    duration: "45 min",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 2,
    title: "Flood Response",
    description: "Navigate flood scenarios including rescue operations and resource management.",
    icon: Droplets,
    difficulty: "Intermediate",
    duration: "60 min",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    title: "Hurricane Preparedness",
    description: "Prepare for and respond to hurricane conditions and aftermath.",
    icon: Wind,
    difficulty: "Advanced",
    duration: "90 min",
    color: "from-gray-400 to-slate-600",
  },
  {
    id: 4,
    title: "Earthquake Response",
    description: "Handle structural damage assessment and urban search & rescue.",
    icon: Mountain,
    difficulty: "Advanced",
    duration: "75 min",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Power Grid Failure",
    description: "Manage critical infrastructure during widespread power outages.",
    icon: Zap,
    difficulty: "Intermediate",
    duration: "50 min",
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: 6,
    title: "Mass Casualty Incident",
    description: "Coordinate emergency medical services in multi-victim scenarios.",
    icon: Shield,
    difficulty: "Expert",
    duration: "120 min",
    color: "from-pink-500 to-rose-600",
  },
];

const Simulations = () => {
  const [phase, setPhase] = useState<SimulationPhase>("list");
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [performanceStats, setPerformanceStats] = useState<SimulationStats | null>(null);

  // 🔥 TIMER STATE
  const [startTime, setStartTime] = useState<number | null>(null);

  // 🚀 STEP 1: SELECT SIMULATION
  const handleStartSimulation = (simulation: Simulation) => {
    setSelectedSimulation(simulation);
    setPhase("difficulty");
  };

  // 🚀 STEP 2: START TIMER AFTER DIFFICULTY
  const handleSelectDifficulty = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setStartTime(Date.now()); // ✅ correct place
    setPhase("playing");
  };

  // 🚀 STEP 3: COMPLETE SIMULATION (FIXED)
  const handleSimulationComplete = async (stats: SimulationStats) => {
    try {
      setPerformanceStats(stats);

      const user = auth.currentUser;

      if (!user) {
        setPhase("feedback");
        return;
      }

      const token = await user.getIdToken();

      const endTime = Date.now();

      // ✅ FIXED TIME (NO DEFAULT 10)
      let totalTime = 0;

      if (startTime !== null) {
        totalTime = Math.floor((endTime - startTime) / 1000);
      }

      console.log("⏱ Time Spent:", totalTime);

      await fetch("http://localhost:5000/update-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          simulation: selectedSimulation?.title.toLowerCase(),
          score: stats?.score || 50,
          time: totalTime,
        }),
      });

      console.log("✅ Progress updated");

    } catch (error) {
      console.log("❌ Error updating:", error);
    }

    setPhase("feedback");
  };

  const handleRetry = () => {
    setPhase("difficulty");
  };

  const handleBackToSimulations = () => {
    setPhase("list");
    setSelectedSimulation(null);
    setSelectedDifficulty("");
    setPerformanceStats(null);
    setStartTime(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {phase === "difficulty" && selectedSimulation && (
          <DifficultySelector
            key="difficulty"
            simulationTitle={selectedSimulation.title}
            onSelect={handleSelectDifficulty}
            onBack={handleBackToSimulations}
          />
        )}

        {phase === "playing" && selectedSimulation && (
          <SimulationPlayer
            key="player"
            simulationTitle={selectedSimulation.title}
            difficulty={selectedDifficulty}
            onComplete={handleSimulationComplete}
            onBack={handleBackToSimulations}
          />
        )}

        {phase === "feedback" && selectedSimulation && performanceStats && (
          <PerformanceFeedback
            key="feedback"
            simulationTitle={selectedSimulation.title}
            stats={performanceStats}
            onRetry={handleRetry}
            onBackToSimulations={handleBackToSimulations}
          />
        )}
      </AnimatePresence>

      {phase === "list" && (
        <>
          <div className="container mx-auto px-6 pt-24 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-neon mb-4">
                Training Simulations
              </h1>
              <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
                Choose from our library of immersive disaster management scenarios
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simulations.map((sim, index) => (
                <motion.div
                  key={sim.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-card rounded-2xl border border-border p-6 h-full hover:border-neon-pink/50 transition-all duration-300 hover:shadow-neon-pink">
                    
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sim.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <sim.icon className="w-7 h-7 text-foreground" />
                    </div>

                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {sim.title}
                    </h3>

                    <p className="text-muted-foreground font-body mb-4 line-clamp-2">
                      {sim.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-muted">
                        {sim.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {sim.duration}
                      </span>
                    </div>

                    <Button
                      variant="cyber"
                      className="w-full"
                      onClick={() => handleStartSimulation(sim)}
                    >
                      Start Simulation
                    </Button>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Simulations;
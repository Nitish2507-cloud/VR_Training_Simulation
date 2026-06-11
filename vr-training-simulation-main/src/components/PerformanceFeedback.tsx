import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Home
} from "lucide-react";
import type { SimulationStats } from "./SimulationPlayer";

interface PerformanceFeedbackProps {
  simulationTitle: string;
  stats: SimulationStats;
  onRetry: () => void;
  onBackToSimulations: () => void;
}

const PerformanceFeedback = ({ 
  simulationTitle, 
  stats, 
  onRetry, 
  onBackToSimulations 
}: PerformanceFeedbackProps) => {
  const getGrade = (score: number): { grade: string; color: string; message: string } => {
    if (score >= 90) return { grade: "A+", color: "text-green-400", message: "Outstanding Performance!" };
    if (score >= 80) return { grade: "A", color: "text-green-500", message: "Excellent Work!" };
    if (score >= 70) return { grade: "B", color: "text-yellow-400", message: "Good Performance" };
    if (score >= 60) return { grade: "C", color: "text-orange-400", message: "Satisfactory" };
    return { grade: "D", color: "text-red-400", message: "Needs Improvement" };
  };

  const { grade, color, message } = getGrade(stats.score);
  
  const avgResponseTime = stats.responseTimes.length > 0 
    ? (stats.responseTimes.reduce((a, b) => a + b, 0) / stats.responseTimes.length).toFixed(1)
    : "N/A";

  const improvements = [
    stats.score < 90 && "Practice quicker decision-making under pressure",
    stats.score < 85 && "Review emergency protocols before next simulation",
    stats.score < 80 && "Focus on situational awareness during training",
    stats.score < 75 && "Consider starting with lower difficulty to build confidence",
    stats.difficulty === "High" && stats.score < 85 && "Master moderate difficulty before attempting high level",
  ].filter(Boolean);

  const strengths = [
    stats.score >= 70 && "Completed the simulation successfully",
    stats.score >= 80 && "Demonstrated good emergency response knowledge",
    stats.score >= 85 && "Showed excellent decision-making skills",
    stats.score >= 90 && "Expert-level performance under pressure",
    stats.completionTime < stats.totalTime * 0.8 && "Efficient time management",
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 overflow-y-auto"
    >
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple mb-4">
              <Trophy className="w-10 h-10 text-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-neon mb-2">
              Performance Feedback
            </h1>
            <p className="text-xl text-muted-foreground font-body">
              {simulationTitle} - {stats.difficulty} Difficulty
            </p>
          </motion.div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-card rounded-3xl border border-border p-8 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Overall Score */}
              <div className="text-center md:border-r border-border">
                <p className="text-sm text-muted-foreground font-body mb-2">Overall Score</p>
                <div className={`text-6xl font-display font-bold ${color} mb-2`}>
                  {stats.score}%
                </div>
                <div className={`text-2xl font-display font-bold ${color}`}>
                  Grade: {grade}
                </div>
                <p className="text-muted-foreground font-body mt-2">{message}</p>
              </div>

              {/* Completion Time */}
              <div className="text-center md:border-r border-border">
                <p className="text-sm text-muted-foreground font-body mb-2">Completion Time</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Clock className="w-8 h-8 text-neon-cyan" />
                  <span className="text-4xl font-display font-bold text-foreground">
                    {Math.floor(stats.completionTime / 60)}:{Math.floor(stats.completionTime % 60).toString().padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  Expected: {Math.floor(stats.totalTime / 60)}:{Math.floor(stats.totalTime % 60).toString().padStart(2, "0")}
                </p>
              </div>

              {/* Response Time */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-body mb-2">Avg Response Time</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Target className="w-8 h-8 text-neon-purple" />
                  <span className="text-4xl font-display font-bold text-foreground">
                    {avgResponseTime}s
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body">Per instruction</p>
              </div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-card rounded-2xl border border-border p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-foreground font-body font-medium">Performance Level</span>
              <span className={`font-display font-bold ${color}`}>{stats.score}%</span>
            </div>
            <Progress value={stats.score} className="h-4" />
            <div className="flex justify-between text-xs text-muted-foreground font-body mt-2">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
              <span>Expert</span>
            </div>
          </motion.div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-card rounded-2xl border border-green-500/30 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {strengths.length > 0 ? strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-body">{strength}</span>
                  </li>
                )) : (
                  <li className="text-muted-foreground font-body">Complete more simulations to identify strengths</li>
                )}
              </ul>
            </motion.div>

            {/* Areas for Improvement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-card rounded-2xl border border-orange-500/30 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground">Areas to Improve</h3>
              </div>
              <ul className="space-y-3">
                {improvements.length > 0 ? improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-body">{improvement}</span>
                  </li>
                )) : (
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-body">Excellent! Keep up the great work!</span>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-card rounded-2xl border border-neon-cyan/30 p-6 mb-8"
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-neon-cyan" />
              Next Steps
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm font-body text-muted-foreground mb-1">Recommended</p>
                <p className="font-body text-foreground">
                  {stats.score >= 85 
                    ? "Try a higher difficulty level" 
                    : "Practice this scenario again"}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm font-body text-muted-foreground mb-1">Focus Area</p>
                <p className="font-body text-foreground">
                  {stats.score >= 80 
                    ? "Advanced decision making" 
                    : "Emergency protocol basics"}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm font-body text-muted-foreground mb-1">Training Goal</p>
                <p className="font-body text-foreground">
                  Achieve {Math.min(100, stats.score + 10)}% on next attempt
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="outline" onClick={onBackToSimulations} className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Back to Simulations
            </Button>
            <Button variant="cyber" onClick={onRetry} className="w-full sm:w-auto">
              <RotateCcw className="w-5 h-5 mr-2" />
              Retry Simulation
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceFeedback;

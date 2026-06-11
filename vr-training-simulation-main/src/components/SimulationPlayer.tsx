import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SkipForward } from "lucide-react";

interface SimulationPlayerProps {
  simulationTitle: string;
  difficulty: string;
  onComplete: (stats: SimulationStats) => void;
  onBack: () => void;
}

export interface SimulationStats {
  completionTime: number;
  totalTime: number;
  score: number;
  responseTimes: number[];
  difficulty: string;
}

// Google Drive video URL for all simulations
const GOOGLE_DRIVE_VIDEO_ID = "1-iwEyRoDCSOlyxUBQKqhxWSTAvxLJdkc";
const GOOGLE_DRIVE_EMBED_URL = `https://drive.google.com/file/d/${GOOGLE_DRIVE_VIDEO_ID}/preview`;

// Estimated video duration in seconds (adjust based on actual video length)
const ESTIMATED_VIDEO_DURATION = 120;

const SimulationPlayer = ({ simulationTitle, difficulty, onComplete, onBack }: SimulationPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime] = useState(Date.now());
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Progress simulation
  useEffect(() => {
    progressIntervalRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        const newProgress = (newTime / ESTIMATED_VIDEO_DURATION) * 100;
        setProgress(Math.min(newProgress, 100));

        // Auto-complete when video ends
        if (newTime >= ESTIMATED_VIDEO_DURATION) {
          handleComplete();
        }

        return newTime;
      });
    }, 1000);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const handleComplete = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    const completionTime = (Date.now() - startTime) / 1000;
    const baseScore = difficulty === "High" ? 70 : difficulty === "Moderate" ? 80 : difficulty === "Medium" ? 85 : 90;
    const score = Math.min(100, baseScore + Math.floor(Math.random() * 15));

    onComplete({
      completionTime,
      totalTime: ESTIMATED_VIDEO_DURATION,
      score,
      responseTimes: [],
      difficulty,
    });
  };

  const skipSimulation = () => {
    handleComplete();
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">
            {simulationTitle}
          </h2>
          <p className="text-sm text-muted-foreground font-body">
            Difficulty: <span className="text-neon-pink">{difficulty}</span>
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Exit Simulation
        </Button>
      </div>

      {/* Video Container - Google Drive Embed */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <iframe
          src={GOOGLE_DRIVE_EMBED_URL}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={`${simulationTitle} Training Video`}
        />
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground font-body mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(ESTIMATED_VIDEO_DURATION)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={skipSimulation}
            >
              <SkipForward className="w-5 h-5 mr-2" /> Complete Simulation
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationPlayer;

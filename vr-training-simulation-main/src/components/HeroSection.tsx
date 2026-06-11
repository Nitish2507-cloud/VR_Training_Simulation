import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import vrHero from "@/assets/vr-hero.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={vrHero}
          alt="VR Training Environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      </div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30 z-10" />

      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        <div className="absolute w-full h-1 bg-neon-cyan/30 animate-scan" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl font-body tracking-[0.3em] text-neon-cyan uppercase"
          >
            Immersive Reality
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient-neon tracking-wider"
          >
            VR TRAINING
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-body leading-relaxed"
          >
            Step into the future of disaster management training. Experience
            realistic simulations that prepare you for real-world emergencies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/login")}
              className="min-w-[200px]"
            >
              Start Training
            </Button>
            <Button
              variant="cyber"
              size="xl"
              onClick={() => navigate("/simulations")}
              className="min-w-[200px]"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -left-20 top-1/3 w-40 h-40 border border-neon-pink/30 rounded-lg animate-float"
          style={{ animationDelay: "0s" }}
        />
        <motion.div
          className="absolute -right-10 bottom-1/4 w-24 h-24 border border-neon-cyan/30 rounded-lg animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default HeroSection;

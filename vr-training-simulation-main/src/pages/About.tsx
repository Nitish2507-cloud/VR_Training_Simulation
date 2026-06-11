import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Target, Users, Award, Sparkles } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Realistic Scenarios",
    description:
      "Our simulations are built with input from disaster management professionals to ensure authentic training experiences.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Train with your team in multiplayer environments that mirror real-world coordination challenges.",
  },
  {
    icon: Award,
    title: "Certification Ready",
    description:
      "Our training programs align with industry standards and can contribute to professional certifications.",
  },
  {
    icon: Sparkles,
    title: "Cutting-Edge Tech",
    description:
      "Experience the latest in VR technology with haptic feedback and spatial audio for full immersion.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-neon mb-4">
            About VR Training
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-3xl mx-auto">
            We're revolutionizing disaster management training through immersive
            virtual reality experiences that prepare first responders for
            real-world emergencies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gradient-card rounded-2xl border border-border p-8 hover:border-neon-cyan/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-pink to-neon-cyan flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-card rounded-2xl border border-neon-pink/30 p-8 md:p-12 text-center shadow-glow"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            To provide accessible, effective, and safe training environments that
            enable emergency responders to develop critical skills without
            real-world risk. We believe that better training leads to faster
            response times, more lives saved, and stronger communities.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

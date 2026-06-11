import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // =========================
  // 🔥 EMAIL LOGIN
  // =========================
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔐 Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔥 Get Firebase token
      const token = await userCredential.user.getIdToken();
      console.log("🔥 TOKEN:", token);

      // 🔥 Send token to backend (LOGIN)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("✅ BACKEND RESPONSE:", data);

      // =========================
      // 🎮 UPDATE PROGRESS (NEW)
      // =========================
      await fetch(`${import.meta.env.VITE_API_URL}/update-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          simulation: "fire",
          score: 50,
          time: 10,
        }),
      });

      console.log("🔥 Progress Updated");

      toast.success("Welcome back!");
      navigate("/simulations");

    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🔥 GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      // 🔐 Firebase Google login
      const result = await signInWithPopup(auth, googleAuthProvider);

      // 🔥 Get Firebase token
      const token = await result.user.getIdToken();
      console.log("🔥 GOOGLE TOKEN:", token);

      // 🔥 Send token to backend (LOGIN)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("✅ BACKEND RESPONSE:", data);

      // =========================
      // 🎮 UPDATE PROGRESS (NEW)
      // =========================
      await fetch(`${import.meta.env.VITE_API_URL}/update-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          simulation: "fire",
          score: 50,
          time: 10,
        }),
      });

      console.log("🔥 Progress Updated");

      toast.success("Welcome back!");
      navigate("/simulations");

    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-glow">

            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-gradient-neon mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground font-body">
                Sign in to continue your training
              </p>
            </div>

            {/* EMAIL LOGIN */}
            <form onSubmit={handleEmailLogin} className="space-y-6">

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* DIVIDER */}
            <div className="my-6 text-center text-muted-foreground">
              OR
            </div>

            {/* GOOGLE LOGIN */}
            <Button
              onClick={handleGoogleLogin}
              className="w-full"
              disabled={loading}
            >
              Sign in with Google
            </Button>

            <p className="text-center mt-6 text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500"
              >
                Sign up
              </button>
            </p>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThreeScene } from '@/components/ui/three-scene';
import { Github, Chrome, Upload, Sparkles, Zap, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-ai-human.jpg';

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    // Mock authentication - in real app would integrate with Firebase/Auth0
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-galaxy">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-30">
        <ThreeScene />
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          className="p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <img 
                src="./deepcheck-logo.svg" 
                alt="DeepCheck Logo" 
                className="w-10 h-10 glow-ai transition-transform hover:scale-105"
              />
              <h1 className="font-orbitron text-2xl font-bold gradient-neon-text">
                DeepCheck
              </h1>
            </div>
            
            <nav className="flex items-center space-x-6">
              <motion.a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-smooth"
                whileHover={{ scale: 1.05 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-smooth"
                whileHover={{ scale: 1.05 }}
              >
                About
              </motion.a>
            </nav>
          </div>
        </motion.header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="space-y-6">
                {/* Hero Title */}
                <motion.div
                  className="flex justify-center lg:justify-start mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h1 className="font-orbitron text-6xl lg:text-8xl font-bold gradient-neon-text">
                    
                  </h1>
                </motion.div>
                
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-ai/10 border border-primary-ai/20 glow-ai"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="w-4 h-4 text-primary-ai mr-2" />
                  <span className="text-sm font-medium text-primary-ai">
                    AI-Powered Detection
                  </span>
                </motion.div>
                
                <h2 className="font-orbitron text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-ai-text">COMBAT</span>
                  <span className="text-foreground"> </span>
                  <span className="gradient-human-text">MISINFORMATION</span>
                </h2>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  AI-powered tool that detects potential misinformation and educates users on identifying credible, 
                  trustworthy content. Analyze text, images, videos, and verify sources in real-time.
                </p>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={() => handleAuth('google')}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    <Chrome className="w-5 h-5 mr-3" />
                    Continue with Google
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={() => handleAuth('github')}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    <Github className="w-5 h-5 mr-3" />
                    Continue with GitHub
                  </Button>
                </motion.div>
              </div>

              {/* Upload Preview */}
              <motion.div
                className="flex items-center justify-center lg:justify-start space-x-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-human/20 flex items-center justify-center animate-float">
                  <Upload className="w-6 h-6 text-primary-human" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Analyze Any Content</p>
                  <p className="text-xs text-muted-foreground">Text • Images • Videos • Audio • URLs</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              className="relative ml-6 lg:ml-12 xl:ml-16"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Card className="glass p-8 hover-lift">
                <img
                  src={heroImage}
                  alt="AI vs Human Detection Visualization"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-neon/5 rounded-lg animate-pulse-ai" />
              </Card>
            </motion.div>
          </div>
        </main>

        {/* Features Preview */}
        <motion.section
          id="features"
          className="px-6 py-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <h3 className="font-orbitron text-3xl font-bold text-center mb-12 gradient-neon-text">
              Why Choose DeepCheck?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Misinformation Detection",
                  description: "Advanced AI models detect fake news, manipulated media, and false claims",
                  color: "ai"
                },
                {
                  icon: Zap,
                  title: "Source Verification",
                  description: "Cross-verify information with trusted authoritative sources",
                  color: "human"
                },
                {
                  icon: Sparkles,
                  title: "Educational Insights",
                  description: "Learn manipulation techniques and improve digital literacy",
                  color: "ai"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass p-6 text-center hover-lift">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-${feature.color}/20 flex items-center justify-center glow-${feature.color === 'ai' ? 'ai' : 'human'}`}>
                      <feature.icon className={`w-8 h-8 text-primary-${feature.color}`} />
                    </div>
                    <h4 className="font-orbitron text-xl font-bold mb-3 text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
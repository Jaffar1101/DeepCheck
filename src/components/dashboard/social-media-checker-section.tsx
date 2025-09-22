import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Video, 
  Instagram, 
  Camera,
  Search, 
  Clock,
  Flag,
  ExternalLink
} from 'lucide-react';

interface SocialMediaCheckerSectionProps {
  onAnalysisComplete: (results: any) => void;
}

export function SocialMediaCheckerSection({ onAnalysisComplete }: SocialMediaCheckerSectionProps) {
  const [reelUrl, setReelUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const { toast } = useToast();

  const analyzeContent = async (url: string, platform: string) => {
    if (!url.trim()) {
      toast({
        title: "No URL provided",
        description: "Please enter a valid social media URL.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis
    const isMisinformation = Math.random() > 0.6;
    const analysis = {
      id: Math.random().toString(36).substr(2, 9),
      platform,
      url,
      verificationStatus: isMisinformation ? 'suspicious' : 'verified',
      trustScore: isMisinformation ? Math.random() * 40 + 10 : Math.random() * 30 + 70,
      confidence: Math.random() * 30 + 70,
      contentType: 'Video Content',
      description: `${platform} ${platform === 'Instagram' ? 'Reel' : 'Video'} analysis`,
      reasoning: {
        primary: isMisinformation 
          ? 'Content shows signs of manipulation or misleading information'
          : 'Content appears authentic with no manipulation detected',
        factors: isMisinformation
          ? ['Inconsistent visual elements', 'Suspicious editing patterns', 'Unverified claims']
          : ['Consistent metadata', 'Natural video patterns', 'Verified account source']
      },
      timestamp: new Date().toISOString()
    };

    await new Promise(resolve => setTimeout(resolve, 4000));

    setAnalyses(prev => [analysis, ...prev]);
    setIsAnalyzing(false);
    setReelUrl('');
    setTiktokUrl('');

    toast({
      title: "Analysis Complete",
      description: `${platform} content has been analyzed.`,
    });

    onAnalysisComplete(analysis);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="font-orbitron text-4xl font-bold gradient-neon-text">
          Social Media Verification
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Analyze Instagram Reels, TikTok videos, and other social media content for authenticity and misinformation.
        </p>
      </motion.div>

      {/* Analysis Tools */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Instagram Reels */}
        <Card className="glass p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-semibold">Instagram Reels</h3>
                <p className="text-sm text-muted-foreground">Verify Instagram Reel content</p>
              </div>
            </div>
            
            <Input
              placeholder="https://instagram.com/reel/..."
              value={reelUrl}
              onChange={(e) => setReelUrl(e.target.value)}
              className="glass"
            />
            
            <Button
              onClick={() => analyzeContent(reelUrl, 'Instagram')}
              disabled={!reelUrl.trim() || isAnalyzing}
              className="w-full"
              variant="ai-gradient"
            >
              {isAnalyzing ? (
                <Clock className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Analyze Reel'}
            </Button>
          </div>
        </Card>

        {/* TikTok Videos */}
        <Card className="glass p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-semibold">TikTok Videos</h3>
                <p className="text-sm text-muted-foreground">Verify TikTok video content</p>
              </div>
            </div>
            
            <Input
              placeholder="https://tiktok.com/@user/video/..."
              value={tiktokUrl}
              onChange={(e) => setTiktokUrl(e.target.value)}
              className="glass"
            />
            
            <Button
              onClick={() => analyzeContent(tiktokUrl, 'TikTok')}
              disabled={!tiktokUrl.trim() || isAnalyzing}
              className="w-full"
              variant="human-gradient"
            >
              {isAnalyzing ? (
                <Clock className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Recent Analyses */}
      {analyses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-orbitron text-xl font-semibold text-foreground">
            Recent Social Media Analyses
          </h3>
          
          <div className="space-y-4">
            {analyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline">{analysis.platform}</Badge>
                          <span className="text-sm text-muted-foreground">{analysis.contentType}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{analysis.description}</p>
                        <a 
                          href={analysis.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-ai hover:underline text-sm"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Original Content
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Flag className={`w-6 h-6 ${
                          analysis.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'
                        }`} />
                        <Badge 
                          variant={analysis.verificationStatus === 'verified' ? 'default' : 'destructive'}
                        >
                          {analysis.verificationStatus === 'verified' ? '✓ VERIFIED' : '⚠ SUSPICIOUS'}
                        </Badge>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${
                      analysis.verificationStatus === 'verified' 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <p className="text-sm text-foreground mb-2">{analysis.reasoning.primary}</p>
                      <div className="space-y-1">
                        {analysis.reasoning.factors.map((factor: string, i: number) => (
                          <div key={i} className="flex items-center space-x-2 text-xs">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              analysis.verificationStatus === 'verified' ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <span className="text-muted-foreground">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

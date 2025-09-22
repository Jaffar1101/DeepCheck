import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Youtube, 
  Search, 
  Clock,
  Flag,
  ExternalLink,
  Play,
  Users,
  Eye
} from 'lucide-react';

interface YouTubeCheckerSectionProps {
  onAnalysisComplete: (results: any) => void;
}

export function YouTubeCheckerSection({ onAnalysisComplete }: YouTubeCheckerSectionProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const { toast } = useToast();

  const analyzeYouTubeVideo = async (url: string) => {
    if (!url.trim()) {
      toast({
        title: "No URL provided",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis
    const isMisinformation = Math.random() > 0.7;
    const videoTitles = [
      "Breaking: Major Scientific Discovery Changes Everything",
      "Government Reveals Secret Information",
      "You Won't Believe What Happened Next",
      "Educational Content About Climate Change",
      "Documentary: The Truth About Technology"
    ];

    const channels = [
      { name: "ScienceDaily", verified: true, subscribers: "2.1M" },
      { name: "NewsChannel", verified: true, subscribers: "5.8M" },
      { name: "RandomUser123", verified: false, subscribers: "1.2K" },
      { name: "FactChecker", verified: true, subscribers: "890K" }
    ];

    const channel = channels[Math.floor(Math.random() * channels.length)];
    const trustScore = channel.verified && isMisinformation === false ? Math.random() * 30 + 70 : Math.random() * 40 + 20;

    const analysis = {
      id: Math.random().toString(36).substr(2, 9),
      platform: 'YouTube',
      url,
      videoTitle: videoTitles[Math.floor(Math.random() * videoTitles.length)],
      channel: channel.name,
      channelVerified: channel.verified,
      subscribers: channel.subscribers,
      views: Math.floor(Math.random() * 10000000) + 1000,
      verificationStatus: trustScore > 60 ? 'verified' : 'suspicious',
      trustScore,
      confidence: Math.random() * 30 + 70,
      contentAnalysis: {
        thumbnailAuthenticity: Math.random() * 40 + 60,
        titleCredibility: Math.random() * 40 + 60,
        descriptionQuality: Math.random() * 40 + 60,
        channelReliability: channel.verified ? Math.random() * 20 + 80 : Math.random() * 40 + 30
      },
      reasoning: {
        primary: trustScore > 60 
          ? 'Video appears to be from a credible source with verified information'
          : 'Video shows potential signs of misinformation or unreliable content',
        factors: trustScore > 60
          ? ['Verified channel', 'Consistent posting history', 'Factual content patterns', 'Proper source citations']
          : ['Unverified channel', 'Clickbait indicators', 'Lack of source citations', 'Sensationalized content']
      },
      timestamp: new Date().toISOString()
    };

    await new Promise(resolve => setTimeout(resolve, 5000));

    setAnalyses(prev => [analysis, ...prev]);
    setIsAnalyzing(false);
    setYoutubeUrl('');

    toast({
      title: "YouTube Analysis Complete",
      description: "Video has been analyzed for authenticity.",
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
          YouTube Content Verification
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Analyze YouTube videos for authenticity, check channel credibility, and detect potential misinformation.
        </p>
      </motion.div>

      {/* Analysis Tool */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-semibold">YouTube Video Analysis</h3>
                <p className="text-muted-foreground">Enter a YouTube URL to verify content authenticity</p>
              </div>
            </div>
            
            <Input
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="glass text-lg py-6"
            />
            
            <Button
              onClick={() => analyzeYouTubeVideo(youtubeUrl)}
              disabled={!youtubeUrl.trim() || isAnalyzing}
              className="w-full py-6 text-lg"
              variant="ai-gradient"
            >
              {isAnalyzing ? (
                <Clock className="w-5 h-5 mr-3 animate-spin" />
              ) : (
                <Search className="w-5 h-5 mr-3" />
              )}
              {isAnalyzing ? 'Analyzing Video...' : 'Analyze YouTube Video'}
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
            Recent YouTube Analyses
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
                  <div className="space-y-6">
                    {/* Video Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-foreground mb-2">
                          {analysis.videoTitle}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{analysis.channel}</span>
                            {analysis.channelVerified && (
                              <Badge variant="outline" className="text-xs">Verified</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{analysis.views.toLocaleString()} views</span>
                          </div>
                        </div>
                        <a 
                          href={analysis.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-ai hover:underline text-sm"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Watch on YouTube
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

                    {/* Analysis Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Trust Score</span>
                          <span className="text-xs font-medium">{analysis.trustScore.toFixed(1)}%</span>
                        </div>
                        <Progress value={analysis.trustScore} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Channel Reliability</span>
                          <span className="text-xs font-medium">{analysis.contentAnalysis.channelReliability.toFixed(1)}%</span>
                        </div>
                        <Progress value={analysis.contentAnalysis.channelReliability} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Title Credibility</span>
                          <span className="text-xs font-medium">{analysis.contentAnalysis.titleCredibility.toFixed(1)}%</span>
                        </div>
                        <Progress value={analysis.contentAnalysis.titleCredibility} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Confidence</span>
                          <span className="text-xs font-medium">{analysis.confidence.toFixed(1)}%</span>
                        </div>
                        <Progress value={analysis.confidence} className="h-2" />
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className={`p-4 rounded-lg border ${
                      analysis.verificationStatus === 'verified' 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <h5 className="font-medium text-foreground mb-2">Analysis Summary</h5>
                      <p className="text-sm text-muted-foreground mb-3">{analysis.reasoning.primary}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

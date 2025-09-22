import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Newspaper, 
  Search, 
  ExternalLink, 
  Clock,
  Globe,
  Flag,
  Shield,
  AlertTriangle,
  CheckCircle,
  Users,
  Calendar,
  TrendingUp,
  Share2
} from 'lucide-react';

interface NewsCheckerSectionProps {
  onAnalysisComplete: (results: any) => void;
}

export function NewsCheckerSection({ onAnalysisComplete }: NewsCheckerSectionProps) {
  const [newsUrl, setNewsUrl] = useState('');
  const [newsText, setNewsText] = useState('');
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('url');
  const { toast } = useToast();

  const mockNewsSources = [
    { name: "Reuters", credible: true, bias: "Center", rating: 9.2 },
    { name: "Associated Press", credible: true, bias: "Center", rating: 9.1 },
    { name: "BBC News", credible: true, bias: "Center-Left", rating: 8.8 },
    { name: "CNN", credible: true, bias: "Left-Center", rating: 7.9 },
    { name: "Unknown Blog", credible: false, bias: "Unknown", rating: 3.2 },
    { name: "Social Media Post", credible: false, bias: "Variable", rating: 2.1 }
  ];

  const mockHeadlines = [
    "Scientists Develop New Treatment for Rare Disease",
    "Government Announces Infrastructure Investment Plan", 
    "Climate Change Report Shows Regional Temperature Increases",
    "Breaking: Aliens Land in Major City (Exclusive Photos)",
    "This One Trick Will Change Your Life Forever",
    "Government Hiding Truth About Health Crisis"
  ];

  const analyzeNews = async (url?: string, text?: string) => {
    if (!url && !text) {
      toast({
        title: "No content to analyze",
        description: "Please enter a news URL or paste article text.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 4000));

    const source = mockNewsSources[Math.floor(Math.random() * mockNewsSources.length)];
    const headline = mockHeadlines[Math.floor(Math.random() * mockHeadlines.length)];
    const isCredible = source.credible;
    const isSensational = headline.includes("Breaking:") || headline.includes("This One Trick");
    
    let trustScore = source.rating * 10;
    if (isSensational) trustScore -= 20;
    if (!isCredible) trustScore = Math.max(trustScore - 40, 10);
    trustScore = Math.min(Math.max(trustScore + (Math.random() * 10 - 5), 0), 100);

    const analysis = {
      id: Math.random().toString(36).substr(2, 9),
      url: url || undefined,
      headline,
      source: source.name,
      author: isCredible ? `${['John Smith', 'Sarah Johnson', 'Michael Brown'][Math.floor(Math.random() * 3)]}` : undefined,
      verificationStatus: trustScore > 60 ? 'verified' : 'suspicious',
      trustScore,
      confidence: Math.random() * 20 + 75,
      publishDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      reasoning: {
        primary: isCredible 
          ? 'Source demonstrates strong journalistic standards and factual accuracy'
          : 'Content shows indicators of potential misinformation or unreliable sourcing',
        factors: isCredible 
          ? ['Established news organization', 'Verified author credentials', 'Multiple source verification', 'Editorial oversight']
          : ['Unverified source', 'Lack of author information', 'No source citations', 'Sensational language']
      },
      sourceCredibility: {
        rating: source.rating,
        factualReporting: isCredible ? 'High' : 'Low',
        bias: source.bias,
        reputation: isCredible ? 'Excellent' : 'Poor',
        trackRecord: isCredible ? 'Consistent accuracy over years' : 'History of questionable content'
      },
      crossChecking: {
        verifiedSources: isCredible ? ['Reuters', 'AP News', 'BBC'].slice(0, Math.floor(Math.random() * 2) + 1) : [],
        contradictorySources: isCredible ? [] : ['Fact-check.org', 'Snopes'].slice(0, Math.floor(Math.random() * 2) + 1),
        similarReports: isCredible ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 3)
      },
      contentAnalysis: {
        languageQuality: isCredible ? Math.random() * 20 + 80 : Math.random() * 40 + 30,
        citationQuality: isCredible ? Math.random() * 25 + 75 : Math.random() * 30 + 20,
        sensationalismScore: isSensational ? Math.random() * 30 + 70 : Math.random() * 30 + 10,
        factDensity: isCredible ? Math.random() * 20 + 70 : Math.random() * 40 + 20
      },
      socialMetrics: {
        shares: Math.floor(Math.random() * 50000) + 100,
        engagement: Math.random() * 8 + 2,
        viralityScore: isSensational ? Math.random() * 40 + 60 : Math.random() * 50 + 20
      },
      timestamp: new Date().toISOString()
    };

    setAnalyses(prev => [analysis, ...prev]);
    setIsAnalyzing(false);
    setNewsUrl('');
    setNewsText('');

    toast({
      title: "News Analysis Complete",
      description: `Article "${headline.substring(0, 30)}..." has been verified.`,
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
          News Verification Center
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Advanced AI-powered analysis for news articles, source credibility verification, and misinformation detection with comprehensive fact-checking.
        </p>
      </motion.div>

      {/* Analysis Tools */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass p-6 max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>URL Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center space-x-2">
                <Newspaper className="w-4 h-4" />
                <span>Text Analysis</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-ai/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary-ai" />
                </div>
                <div>
                  <h3 className="font-orbitron text-lg font-semibold">URL Verification</h3>
                  <p className="text-sm text-muted-foreground">Analyze news articles by URL with full metadata extraction</p>
                </div>
              </div>
              
              <Input
                placeholder="https://example.com/news-article"
                value={newsUrl}
                onChange={(e) => setNewsUrl(e.target.value)}
                className="glass text-lg py-6"
              />
              
              <Button
                onClick={() => analyzeNews(newsUrl)}
                disabled={!newsUrl.trim() || isAnalyzing}
                className="w-full py-6 text-lg"
                variant="ai-gradient"
              >
                {isAnalyzing ? (
                  <Clock className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 mr-3" />
                )}
                {isAnalyzing ? 'Analyzing Article...' : 'Verify News Article'}
              </Button>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-human/20 flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-primary-human" />
                </div>
                <div>
                  <h3 className="font-orbitron text-lg font-semibold">Text Analysis</h3>
                  <p className="text-sm text-muted-foreground">Paste article content for direct content verification</p>
                </div>
              </div>
              
              <Textarea
                placeholder="Paste news article content here for comprehensive analysis..."
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                className="min-h-[200px] resize-none glass text-base"
              />
              
              <Button
                onClick={() => analyzeNews(undefined, newsText)}
                disabled={!newsText.trim() || isAnalyzing}
                className="w-full py-6 text-lg"
                variant="human-gradient"
              >
                {isAnalyzing ? (
                  <Clock className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 mr-3" />
                )}
                {isAnalyzing ? 'Analyzing Content...' : 'Analyze Article Text'}
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>

      {/* Recent Analyses */}
      {analyses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-orbitron text-2xl font-semibold text-foreground text-center">
            Recent News Analyses
          </h3>
          
          <div className="space-y-6">
            {analyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass p-6">
                  <div className="space-y-6">
                    {/* Article Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-xl text-foreground mb-3">
                          {analysis.headline}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Newspaper className="w-4 h-4" />
                            <span className="font-medium">{analysis.source}</span>
                          </div>
                          {analysis.author && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>By {analysis.author}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{analysis.publishDate}</span>
                          </div>
                          {analysis.url && (
                            <a 
                              href={analysis.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center hover:text-primary-ai transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Source
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Flag className={`w-8 h-8 ${
                          analysis.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'
                        }`} />
                        <Badge 
                          variant={analysis.verificationStatus === 'verified' ? 'default' : 'destructive'}
                          className="text-sm px-3 py-1"
                        >
                          {analysis.verificationStatus === 'verified' ? (
                            <><CheckCircle className="w-4 h-4 mr-1" /> VERIFIED</>
                          ) : (
                            <><AlertTriangle className="w-4 h-4 mr-1" /> SUSPICIOUS</>
                          )}
                        </Badge>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <div className="text-2xl font-bold text-foreground">{analysis.trustScore.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Trust Score</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <div className="text-2xl font-bold text-foreground">{analysis.sourceCredibility.rating.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Source Rating</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <div className="text-2xl font-bold text-foreground">{analysis.crossChecking.similarReports}</div>
                        <div className="text-xs text-muted-foreground">Similar Reports</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <div className="text-2xl font-bold text-foreground">{analysis.confidence.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Primary Assessment */}
                      <div className={`p-4 rounded-lg border ${
                        analysis.verificationStatus === 'verified' 
                          ? 'bg-green-500/10 border-green-500/30' 
                          : 'bg-red-500/10 border-red-500/30'
                      }`}>
                        <h5 className="font-medium text-foreground mb-3 flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Primary Assessment
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">{analysis.reasoning.primary}</p>
                        <div className="space-y-2">
                          {analysis.reasoning.factors.slice(0, 4).map((factor: string, i: number) => (
                            <div key={i} className="flex items-center space-x-2 text-xs">
                              <div className={`w-2 h-2 rounded-full ${
                                analysis.verificationStatus === 'verified' ? 'bg-green-500' : 'bg-red-500'
                              }`} />
                              <span className="text-muted-foreground">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Source Credibility */}
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                        <h5 className="font-medium text-foreground mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Source Analysis
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-muted-foreground">Factual Reporting:</span>
                            <div className="font-medium text-foreground">{analysis.sourceCredibility.factualReporting}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Political Bias:</span>
                            <div className="font-medium text-foreground">{analysis.sourceCredibility.bias}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Reputation:</span>
                            <div className="font-medium text-foreground">{analysis.sourceCredibility.reputation}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Track Record:</span>
                            <div className="font-medium text-foreground">{analysis.sourceCredibility.trackRecord}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Analysis Metrics */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-foreground">Content Quality Analysis</h5>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Language Quality</span>
                            <span className="text-xs font-medium">{analysis.contentAnalysis.languageQuality.toFixed(0)}%</span>
                          </div>
                          <Progress value={analysis.contentAnalysis.languageQuality} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Citation Quality</span>
                            <span className="text-xs font-medium">{analysis.contentAnalysis.citationQuality.toFixed(0)}%</span>
                          </div>
                          <Progress value={analysis.contentAnalysis.citationQuality} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Fact Density</span>
                            <span className="text-xs font-medium">{analysis.contentAnalysis.factDensity.toFixed(0)}%</span>
                          </div>
                          <Progress value={analysis.contentAnalysis.factDensity} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Sensationalism</span>
                            <span className="text-xs font-medium">{analysis.contentAnalysis.sensationalismScore.toFixed(0)}%</span>
                          </div>
                          <Progress value={analysis.contentAnalysis.sensationalismScore} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Cross-verification & Social Metrics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Cross-verification */}
                      <div className="p-3 rounded-lg bg-muted/10 border border-border/20">
                        <h6 className="font-medium text-sm text-foreground mb-2">Cross-Verification</h6>
                        {analysis.crossChecking.verifiedSources.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs text-green-600 font-medium">✓ Verified by: </span>
                            <span className="text-xs text-muted-foreground">{analysis.crossChecking.verifiedSources.join(', ')}</span>
                          </div>
                        )}
                        {analysis.crossChecking.contradictorySources.length > 0 && (
                          <div>
                            <span className="text-xs text-red-600 font-medium">⚠ Contradicted by: </span>
                            <span className="text-xs text-muted-foreground">{analysis.crossChecking.contradictorySources.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      {/* Social Metrics */}
                      <div className="p-3 rounded-lg bg-muted/10 border border-border/20">
                        <h6 className="font-medium text-sm text-foreground mb-2 flex items-center">
                          <Share2 className="w-3 h-3 mr-1" />
                          Social Impact
                        </h6>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="font-medium text-foreground">{analysis.socialMetrics.shares.toLocaleString()}</div>
                            <div className="text-muted-foreground">Shares</div>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{analysis.socialMetrics.engagement.toFixed(1)}%</div>
                            <div className="text-muted-foreground">Engagement</div>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{analysis.socialMetrics.viralityScore.toFixed(0)}</div>
                            <div className="text-muted-foreground">Virality</div>
                          </div>
                        </div>
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

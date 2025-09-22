import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileText,
  Link as LinkIcon,
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Flag,
  Eye,
  Download,
  Share,
  ExternalLink,
  Newspaper,
  Youtube,
  Instagram,
  Calendar,
  Users,
  TrendingUp,
  Share2,
  Globe
} from 'lucide-react';

interface ResultsSectionProps {
  results: any;
}

export function ResultsSection({ results }: ResultsSectionProps) {
  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="glass p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
            <Eye className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-orbitron text-xl font-semibold text-foreground mb-2">
            No Results Yet
          </h3>
          <p className="text-muted-foreground">
            Analyze content to see detailed misinformation detection results here.
          </p>
        </Card>
      </div>
    );
  }

  const { 
    title, 
    contentType, 
    content, 
    verificationStatus, 
    trustScore, 
    confidence, 
    reasoning, 
    sources, 
    analysis, 
    timestamp 
  } = results;

  const getContentIcon = (type: string) => {
    // Check if results contain platform information
    if (results.platform) {
      switch (results.platform.toLowerCase()) {
        case 'youtube': return Youtube;
        case 'instagram': return Instagram;
        case 'tiktok': return FileVideo;
        default: break;
      }
    }
    
    // Check content type
    switch (type.toLowerCase()) {
      case 'image': return FileImage;
      case 'video': 
      case 'video content': return FileVideo;
      case 'audio': return FileAudio;
      case 'text':
      case 'text analysis': return FileText;
      case 'url':
      case 'news article': return results.source ? Newspaper : LinkIcon;
      default: return FileImage;
    }
  };

  const getVerificationColor = (status: string) => {
    return status === 'verified' ? 'success' : 'destructive';
  };

  const getVerificationIcon = (status: string) => {
    return status === 'verified' ? CheckCircle : XCircle;
  };

  const getFlagColor = (status: string) => {
    return status === 'verified' ? 'text-green-500' : 'text-red-500';
  };

  const ContentIcon = getContentIcon(contentType);
  const VerificationIcon = getVerificationIcon(verificationStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-orbitron text-4xl font-bold gradient-neon-text">
              Verification Results
            </h1>
            <div className="flex items-center space-x-2">
              <Flag className={`w-8 h-8 ${getFlagColor(verificationStatus)}`} />
              <Badge 
                variant={verificationStatus === 'verified' ? 'default' : 'destructive'}
                className="text-lg px-4 py-2"
              >
                {verificationStatus === 'verified' ? '✓ VERIFIED' : '⚠ SUSPICIOUS'}
              </Badge>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="glass">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="glass">
              <Share className="w-4 h-4 mr-2" />
              Share Results
            </Button>
            {contentType === 'url' && (
              <Button variant="outline" size="sm" className="glass" asChild>
                <a href={content} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Source
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            verificationStatus === 'verified' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <ContentIcon className={`w-6 h-6 ${
              verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="font-semibold text-lg text-foreground">
                {results.headline || results.videoTitle || title}
              </h2>
              {results.platform && (
                <Badge variant="outline" className="text-xs">
                  {results.platform}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {results.source && (
                <div className="flex items-center space-x-1">
                  <Newspaper className="w-4 h-4" />
                  <span>{results.source}</span>
                </div>
              )}
              {results.channel && (
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{results.channel}</span>
                </div>
              )}
              {results.publishDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{results.publishDate}</span>
                </div>
              )}
              <span>Analyzed on {new Date(timestamp).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trust Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass p-6 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              verificationStatus === 'verified' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <VerificationIcon className={`w-8 h-8 ${
                verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'
              }`} />
            </div>
            
            <h3 className="font-orbitron text-xl font-semibold mb-2">
              Trust Score
            </h3>
            
            <div className={`text-4xl font-bold font-orbitron mb-2 ${
              verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trustScore.toFixed(1)}%
            </div>
            
            <Badge 
              variant={verificationStatus === 'verified' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {trustScore >= 80 ? 'High Trust' : 
               trustScore >= 60 ? 'Medium Trust' : 'Low Trust'}
            </Badge>
          </Card>
        </motion.div>

        {/* Primary Reasoning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass p-6">
            <h3 className="font-orbitron text-xl font-semibold mb-4 text-center">
              Primary Assessment
            </h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                verificationStatus === 'verified' 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-start space-x-3">
                  <Flag className={`w-5 h-5 mt-0.5 ${getFlagColor(verificationStatus)}`} />
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      {reasoning.primary}
                    </p>
                    <p className={`text-sm ${
                      verificationStatus === 'verified' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {verificationStatus === 'verified' 
                        ? 'This content appears to be reliable' 
                        : 'This content shows signs of misinformation'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Supporting Evidence:</h4>
                {reasoning.secondary.map((reason: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      verificationStatus === 'verified' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Confidence Level */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-primary-ai" />
              <h3 className="font-orbitron text-xl font-semibold">
                Analysis Confidence
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Confidence Level</span>
                  <span className="text-sm font-medium">{confidence.toFixed(1)}%</span>
                </div>
                <Progress value={confidence} className="h-3" />
              </div>
              
              <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <p className="text-sm text-foreground">
                  {confidence >= 85 ? (
                    <span className="text-green-600 font-medium">
                      ✅ High confidence in analysis results
                    </span>
                  ) : confidence >= 65 ? (
                    <span className="text-yellow-600 font-medium">
                      ⚡ Moderate confidence - consider additional verification
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      ⚠️ Low confidence - manual review recommended
                    </span>
                  )}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Content Analysis for News/Social Media */}
      {(results.contentAnalysis || results.socialMetrics || results.sourceCredibility) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Content Quality Metrics */}
          {results.contentAnalysis && (
            <Card className="glass p-6">
              <h3 className="font-orbitron text-xl font-semibold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-primary-ai" />
                Content Quality Analysis
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Language Quality</span>
                    <span className="text-sm font-medium">{results.contentAnalysis.languageQuality?.toFixed(0)}%</span>
                  </div>
                  <Progress value={results.contentAnalysis.languageQuality} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Citation Quality</span>
                    <span className="text-sm font-medium">{results.contentAnalysis.citationQuality?.toFixed(0)}%</span>
                  </div>
                  <Progress value={results.contentAnalysis.citationQuality} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Fact Density</span>
                    <span className="text-sm font-medium">{results.contentAnalysis.factDensity?.toFixed(0)}%</span>
                  </div>
                  <Progress value={results.contentAnalysis.factDensity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sensationalism</span>
                    <span className="text-sm font-medium">{results.contentAnalysis.sensationalismScore?.toFixed(0)}%</span>
                  </div>
                  <Progress value={results.contentAnalysis.sensationalismScore} className="h-2" />
                </div>
              </div>
            </Card>
          )}

          {/* Social Media Metrics */}
          {results.socialMetrics && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass p-6">
                <h3 className="font-orbitron text-xl font-semibold mb-6 flex items-center">
                  <Share2 className="w-6 h-6 mr-3 text-primary-human" />
                  Social Impact
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/20">
                    <div className="text-2xl font-bold text-foreground">{results.socialMetrics.shares?.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Shares</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20">
                    <div className="text-2xl font-bold text-foreground">{results.socialMetrics.engagement?.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/20">
                    <div className="text-2xl font-bold text-foreground">{results.socialMetrics.viralityScore?.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground">Virality</div>
                  </div>
                </div>
              </Card>

              {/* Source Credibility for News */}
              {results.sourceCredibility && (
                <Card className="glass p-6">
                  <h3 className="font-orbitron text-xl font-semibold mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-primary-ai" />
                    Source Credibility
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Source Rating:</span>
                      <span className="font-medium">{results.sourceCredibility.rating?.toFixed(1)}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Factual Reporting:</span>
                      <span className="font-medium">{results.sourceCredibility.factualReporting}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Political Bias:</span>
                      <span className="font-medium">{results.sourceCredibility.bias}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Reputation:</span>
                      <span className="font-medium">{results.sourceCredibility.reputation}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Cross-verification */}
          {results.crossChecking && (
            <Card className="glass p-6">
              <h3 className="font-orbitron text-xl font-semibold mb-6 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-primary-ai" />
                Cross-Verification
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3 text-green-600">✓ Verified Sources</h4>
                  {results.crossChecking.verifiedSources?.length > 0 ? (
                    <div className="space-y-2">
                      {results.crossChecking.verifiedSources.map((source: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{source}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No verified sources found</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3 text-red-600">⚠ Contradictory Sources</h4>
                  {results.crossChecking.contradictorySources?.length > 0 ? (
                    <div className="space-y-2">
                      {results.crossChecking.contradictorySources.map((source: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>{source}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No contradictory sources found</p>
                  )}
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      )}

      {/* Sources and Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sources Verification */}
          <Card className="glass p-6">
            <h3 className="font-orbitron text-xl font-semibold mb-6">
              Source Verification
            </h3>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                {verificationStatus === 'verified' ? 'Trusted Sources Found:' : 'Questionable Sources Detected:'}
              </h4>
              
              <div className="space-y-3">
                {sources.map((source: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      verificationStatus === 'verified' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm text-muted-foreground">{source}</span>
                  </div>
                ))}
              </div>

              {verificationStatus !== 'verified' && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-600">
                    ⚠️ Content originates from unverified or potentially unreliable sources. 
                    Exercise caution and seek additional verification.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Analysis Methods */}
          <Card className="glass p-6">
            <h3 className="font-orbitron text-xl font-semibold mb-6">
              Analysis Methods Applied
            </h3>
            
            <div className="space-y-3">
              {Object.entries(analysis).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <Badge variant={enabled ? "default" : "secondary"}>
                    {enabled ? 'Applied' : 'Not Applicable'}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
              <h4 className="font-semibold text-foreground mb-2">Key Indicators:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {verificationStatus === 'verified' ? (
                  <>
                    <li>• Cross-referenced with authoritative sources</li>
                    <li>• Factual consistency verified</li>
                    <li>• No manipulation patterns detected</li>
                  </>
                ) : (
                  <>
                    <li>• Inconsistencies with verified information</li>
                    <li>• Questionable source credibility</li>
                    <li>• Potential manipulation indicators found</li>
                  </>
                )}
              </ul>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
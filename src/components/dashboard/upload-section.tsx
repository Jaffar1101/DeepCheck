import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileText,
  Link as LinkIcon,
  X, 
  Zap,
  AlertCircle,
  Search 
} from 'lucide-react';

interface UploadSectionProps {
  onAnalysisComplete: (results: any) => void;
}

interface ContentUpload {
  id: string;
  content: File | string;
  type: 'image' | 'video' | 'audio' | 'text' | 'url';
  title?: string;
  progress: number;
  status: 'uploading' | 'analyzing' | 'complete' | 'error';
}

export function UploadSection({ onAnalysisComplete }: UploadSectionProps) {
  const [uploads, setUploads] = useState<ContentUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const { toast } = useToast();

  const getFileType = (file: File): 'image' | 'video' | 'audio' | null => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return null;
  };

  const getContentIcon = (type: 'image' | 'video' | 'audio' | 'text' | 'url') => {
    switch (type) {
      case 'image': return FileImage;
      case 'video': return FileVideo;
      case 'audio': return FileAudio;
      case 'text': return FileText;
      case 'url': return LinkIcon;
    }
  };

  const handleFileUpload = useCallback((files: FileList) => {
    const newUploads: ContentUpload[] = [];
    
    Array.from(files).forEach(file => {
      const fileType = getFileType(file);
      if (!fileType) {
        toast({
          title: "Unsupported file type",
          description: `${file.name} is not a supported media file.`,
          variant: "destructive",
        });
        return;
      }

      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 50MB limit.`,
          variant: "destructive",
        });
        return;
      }

      const upload: ContentUpload = {
        id: Math.random().toString(36).substr(2, 9),
        content: file,
        title: file.name,
        type: fileType,
        progress: 0,
        status: 'uploading'
      };
      
      newUploads.push(upload);
    });

    setUploads(prev => [...prev, ...newUploads]);

    // Simulate upload and analysis
    newUploads.forEach(upload => {
      simulateAnalysis(upload);
    });
  }, [toast]);

  const handleTextAnalysis = () => {
    if (!textContent.trim()) {
      toast({
        title: "No content to analyze",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    const upload: ContentUpload = {
      id: Math.random().toString(36).substr(2, 9),
      content: textContent,
      title: `Text: ${textContent.substring(0, 50)}${textContent.length > 50 ? '...' : ''}`,
      type: 'text',
      progress: 0,
      status: 'analyzing'
    };

    setUploads(prev => [...prev, upload]);
    simulateAnalysis(upload);
    setTextContent('');
  };

  const handleUrlAnalysis = () => {
    if (!urlContent.trim()) {
      toast({
        title: "No URL to analyze",
        description: "Please enter a URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    const upload: ContentUpload = {
      id: Math.random().toString(36).substr(2, 9),
      content: urlContent,
      title: `URL: ${urlContent}`,
      type: 'url',
      progress: 0,
      status: 'analyzing'
    };

    setUploads(prev => [...prev, upload]);
    simulateAnalysis(upload);
    setUrlContent('');
  };

  const simulateAnalysis = async (upload: ContentUpload) => {
    // Simulate upload progress for files
    if (upload.content instanceof File) {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploads(prev => prev.map(u => 
          u.id === upload.id ? { ...u, progress: i } : u
        ));
      }
    }

    // Change to analyzing
    setUploads(prev => prev.map(u => 
      u.id === upload.id ? { ...u, status: 'analyzing', progress: 100 } : u
    ));

    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate more sophisticated mock results based on content type
    const isMisinformation = Math.random() > 0.5;
    const mockResults = {
      title: upload.title,
      contentType: upload.type,
      content: typeof upload.content === 'string' ? upload.content : upload.content.name,
      
      // Red/Green flag system
      verificationStatus: isMisinformation ? 'suspicious' : 'verified',
      trustScore: isMisinformation ? Math.random() * 40 + 10 : Math.random() * 30 + 70, // 10-50% for fake, 70-100% for real
      confidence: Math.random() * 30 + 70,
      
      // Detailed reasoning
      reasoning: {
        primary: isMisinformation 
          ? ['Lack of credible sources', 'Suspicious timing', 'Contradicts verified facts'][Math.floor(Math.random() * 3)]
          : ['Verified by multiple sources', 'Matches official records', 'Consistent with known facts'][Math.floor(Math.random() * 3)],
        secondary: isMisinformation
          ? ['Emotional language patterns', 'Missing context', 'Unverified claims']
          : ['Factual language', 'Proper sourcing', 'Cross-referenced information'],
      },
      
      sources: isMisinformation 
        ? ['Unverified social media posts', 'Anonymous sources', 'Discredited websites']
        : ['Reuters', 'Associated Press', 'Government sources', 'Academic institutions'],
      
      analysis: {
        text_analysis: upload.type === 'text' || upload.type === 'url',
        source_verification: upload.type === 'url',
        media_authenticity: upload.type === 'image' || upload.type === 'video' || upload.type === 'audio',
        cross_reference_check: true,
        sentiment_analysis: upload.type === 'text',
      },
      
      timestamp: new Date().toISOString(),
    };

    setUploads(prev => prev.map(u => 
      u.id === upload.id ? { ...u, status: 'complete' } : u
    ));

    toast({
      title: "Analysis Complete",
      description: `${upload.title} has been processed successfully.`,
    });

    onAnalysisComplete(mockResults);
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="font-orbitron text-4xl font-bold gradient-neon-text">
          Analyze Content for Misinformation
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Analyze text, URLs, images, videos, or audio to detect misinformation, verify sources, and get detailed explanations.
        </p>
      </motion.div>

      {/* Analysis Tabs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="media" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="media" className="data-[state=active]:bg-primary-ai/20">
              <Upload className="w-4 h-4 mr-2" />
              Media Files
            </TabsTrigger>
            <TabsTrigger value="text" className="data-[state=active]:bg-primary-ai/20">
              <FileText className="w-4 h-4 mr-2" />
              Text Content
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-primary-ai/20">
              <LinkIcon className="w-4 h-4 mr-2" />
              URLs & Articles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="mt-6">
            <Card
              className={`glass p-12 text-center transition-all duration-300 hover-lift ${
                isDragging ? 'border-primary-ai bg-primary-ai/5 glow-ai' : 'border-border/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-ai/20 flex items-center justify-center glow-ai">
                  <Upload className="w-10 h-10 text-primary-ai" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-orbitron text-xl font-semibold text-foreground">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-muted-foreground">
                    Supports images (JPG, PNG, WebP), videos (MP4, AVI, MOV), and audio (MP3, WAV, M4A)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Maximum file size: 50MB
                  </p>
                </div>

                <Button
                  size="lg"
                  variant="ai-gradient"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Select Files
                </Button>

                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*"
                  className="hidden"
                  title="Select media files for analysis"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="text" className="mt-6">
            <Card className="glass p-8">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-human/20 flex items-center justify-center glow-human">
                    <FileText className="w-8 h-8 text-primary-human" />
                  </div>
                  <h3 className="font-orbitron text-xl font-semibold text-foreground">
                    Analyze Text Content
                  </h3>
                  <p className="text-muted-foreground">
                    Paste news articles, social media posts, or any text to check for misinformation
                  </p>
                </div>

                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste text content here to analyze for misinformation, bias, and credibility..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="min-h-[200px] resize-none glass"
                  />
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {textContent.length} characters
                    </p>
                    <Button
                      onClick={handleTextAnalysis}
                      disabled={!textContent.trim()}
                      variant="human-gradient"
                      size="lg"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Analyze Text
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="url" className="mt-6">
            <Card className="glass p-8">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-accent-orange/20 flex items-center justify-center">
                    <LinkIcon className="w-8 h-8 text-accent-orange" />
                  </div>
                  <h3 className="font-orbitron text-xl font-semibold text-foreground">
                    Verify URLs & Articles
                  </h3>
                  <p className="text-muted-foreground">
                    Enter news article URLs, social media links, or web pages to verify their credibility
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="https://example.com/news-article"
                    value={urlContent}
                    onChange={(e) => setUrlContent(e.target.value)}
                    className="glass"
                  />
                  
                  <Button
                    onClick={handleUrlAnalysis}
                    disabled={!urlContent.trim()}
                    variant="outline"
                    size="lg"
                    className="w-full glass"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Verify URL
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Upload Queue */}
      {uploads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-orbitron text-xl font-semibold text-foreground">
            Analysis Queue
          </h3>
          
          <div className="space-y-3">
            {uploads.map((upload, index) => {
              const Icon = getContentIcon(upload.type);
              
              return (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        upload.type === 'image' ? 'bg-gradient-ai/20' :
                        upload.type === 'video' ? 'bg-gradient-human/20' :
                        upload.type === 'text' ? 'bg-gradient-human/20' :
                        upload.type === 'url' ? 'bg-accent-orange/20' :
                        'bg-accent-orange/20'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          upload.type === 'image' ? 'text-primary-ai' :
                          upload.type === 'video' ? 'text-primary-human' :
                          upload.type === 'text' ? 'text-primary-human' :
                          upload.type === 'url' ? 'text-accent-orange' :
                          'text-accent-orange'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {upload.title || (upload.content instanceof File ? upload.content.name : 'Content')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {upload.content instanceof File 
                            ? `${(upload.content.size / (1024 * 1024)).toFixed(2)} MB • ${upload.type.toUpperCase()}`
                            : `${upload.type.toUpperCase()} Content`
                          }
                        </p>
                        
                        {upload.status === 'uploading' && (
                          <div className="mt-2">
                            <Progress value={upload.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">
                              Uploading... {upload.progress}%
                            </p>
                          </div>
                        )}
                        
                        {upload.status === 'analyzing' && (
                          <div className="mt-2 flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-primary-ai animate-pulse" />
                            <p className="text-sm text-primary-ai">
                              Analyzing with AI models...
                            </p>
                          </div>
                        )}
                        
                        {upload.status === 'complete' && (
                          <div className="mt-2 flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-success" />
                            <p className="text-sm text-success">
                              Analysis complete
                            </p>
                          </div>
                        )}
                        
                        {upload.status === 'error' && (
                          <div className="mt-2 flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-destructive" />
                            <p className="text-sm text-destructive">
                              Analysis failed
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUpload(upload.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
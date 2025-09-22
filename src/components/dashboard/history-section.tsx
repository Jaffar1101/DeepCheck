import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileImage, 
  FileVideo, 
  FileAudio, 
  Search, 
  Filter,
  Download,
  Eye,
  Trash2,
  Calendar
} from 'lucide-react';

interface HistoryItem {
  id: string;
  filename: string;
  fileType: 'image' | 'video' | 'audio';
  authenticity: {
    human: number;
    ai: number;
  };
  confidence: number;
  timestamp: string;
  status: 'complete' | 'processing' | 'failed';
}

// Mock data for demonstration
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    filename: 'portrait_selfie.jpg',
    fileType: 'image',
    authenticity: { human: 85.3, ai: 14.7 },
    confidence: 92.1,
    timestamp: '2024-01-15T10:30:00Z',
    status: 'complete'
  },
  {
    id: '2', 
    filename: 'speech_sample.mp3',
    fileType: 'audio',
    authenticity: { human: 23.8, ai: 76.2 },
    confidence: 88.5,
    timestamp: '2024-01-15T09:15:00Z',
    status: 'complete'
  },
  {
    id: '3',
    filename: 'interview_video.mp4',
    fileType: 'video',
    authenticity: { human: 67.4, ai: 32.6 },
    confidence: 75.2,
    timestamp: '2024-01-14T16:45:00Z',
    status: 'complete'
  },
  {
    id: '4',
    filename: 'ai_generated_face.png',
    fileType: 'image',
    authenticity: { human: 8.9, ai: 91.1 },
    confidence: 96.3,
    timestamp: '2024-01-14T14:20:00Z',
    status: 'complete'
  },
  {
    id: '5',
    filename: 'podcast_clip.wav',
    fileType: 'audio',
    authenticity: { human: 78.1, ai: 21.9 },
    confidence: 82.4,
    timestamp: '2024-01-13T11:30:00Z',
    status: 'complete'
  }
];

export function HistorySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const getFileIcon = (type: 'image' | 'video' | 'audio') => {
    switch (type) {
      case 'image': return FileImage;
      case 'video': return FileVideo;
      case 'audio': return FileAudio;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge variant="default" className="bg-success text-success-foreground">Complete</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAuthenticityBadge = (ai: number) => {
    if (ai > 70) return <Badge variant="destructive">Likely AI</Badge>;
    if (ai > 40) return <Badge className="bg-warning text-warning-foreground">Mixed</Badge>;
    return <Badge className="bg-success text-success-foreground">Likely Human</Badge>;
  };

  const filteredHistory = mockHistory
    .filter(item => {
      const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || item.fileType === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'confidence':
          return b.confidence - a.confidence;
        case 'filename':
          return a.filename.localeCompare(b.filename);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="font-orbitron text-4xl font-bold gradient-neon-text">
          Analysis History
        </h1>
        <p className="text-muted-foreground text-lg">
          Review your past deepfake detection analyses and results.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass border-border/30"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="glass border-border/30">
                <SelectValue placeholder="File type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="glass border-border/30">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="confidence">Confidence</SelectItem>
                <SelectItem value="filename">Filename</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="glass">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-muted-foreground">
          Showing {filteredHistory.length} of {mockHistory.length} analyses
        </p>
      </motion.div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((item, index) => {
          const FileIcon = getFileIcon(item.fileType);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card className="glass p-4 hover-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      item.fileType === 'image' ? 'bg-gradient-ai/20' :
                      item.fileType === 'video' ? 'bg-gradient-human/20' :
                      'bg-accent-orange/20'
                    }`}>
                      <FileIcon className={`w-6 h-6 ${
                        item.fileType === 'image' ? 'text-primary-ai' :
                        item.fileType === 'video' ? 'text-primary-human' :
                        'text-accent-orange'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {item.filename}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                        </div>
                        <span className="text-xs text-muted-foreground uppercase">
                          {item.fileType}
                        </span>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-sm text-foreground">
                        {item.confidence.toFixed(1)}% confidence
                      </div>
                      <div className="text-xs text-muted-foreground">
                        AI: {item.authenticity.ai.toFixed(1)}% | Human: {item.authenticity.human.toFixed(1)}%
                      </div>
                    </div>
                    
                    {getAuthenticityBadge(item.authenticity.ai)}
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-orbitron text-xl font-semibold text-foreground mb-2">
              No Results Found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to see more results.
            </p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
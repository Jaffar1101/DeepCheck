import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Upload, 
  BarChart3, 
  History, 
  Settings, 
  LogOut, 
  Sparkles,
  User,
  Menu,
  X,
  Newspaper,
  Video,
  Youtube
} from 'lucide-react';
import { DashboardView } from './dashboard-page';
import { useState } from 'react';

interface DashboardSidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onLogout: () => void;
}

const navigationItems = [
  { 
    id: 'upload' as DashboardView, 
    label: 'Analyze Content', 
    icon: Upload, 
    description: 'Upload & verify content'
  },
  { 
    id: 'news-checker' as DashboardView, 
    label: 'News Checker', 
    icon: Newspaper, 
    description: 'Verify news articles'
  },
  { 
    id: 'social-media' as DashboardView, 
    label: 'Social Media', 
    icon: Video, 
    description: 'Check reels & videos'
  },
  { 
    id: 'youtube-checker' as DashboardView, 
    label: 'YouTube Checker', 
    icon: Youtube, 
    description: 'Analyze YouTube content'
  },
  { 
    id: 'results' as DashboardView, 
    label: 'Results', 
    icon: BarChart3, 
    description: 'View analysis results'
  },
  { 
    id: 'history' as DashboardView, 
    label: 'History', 
    icon: History, 
    description: 'Previous analyses'
  },
  { 
    id: 'settings' as DashboardView, 
    label: 'Settings', 
    icon: Settings, 
    description: 'Account & preferences'
  },
];

export function DashboardSidebar({ currentView, onViewChange, onLogout }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`glass border-r border-border/30 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} h-screen sticky top-0`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-foreground hover:bg-accent/20"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>
      
      <div className="px-3 py-4 space-y-6">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-3 px-3">
            <img 
              src="/deepcheck-logo.svg" 
              alt="DeepCheck Logo" 
              className="w-10 h-10 glow-ai"
            />
            {!isCollapsed && (
              <div>
                <h1 className="font-orbitron text-lg font-bold gradient-neon-text">
                  DeepCheck
                </h1>
                <p className="text-xs text-muted-foreground">Misinformation Detector</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* User Profile */}
        {!isCollapsed && (
          <motion.div 
            className="mb-6 px-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass p-3 border border-border/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-human flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-human-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Demo User
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    demo@deepcheck.ai
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="space-y-2">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-orbitron text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
          )}
          
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 3) }}
              >
                <Button
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full transition-smooth hover-lift ${
                    isCollapsed ? 'justify-center px-2' : 'justify-start'
                  } ${
                    currentView === item.id 
                      ? 'bg-gradient-ai/20 text-primary-ai border border-primary-ai/30 glow-ai' 
                      : 'hover:bg-accent/10 hover:text-accent-foreground'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${!isCollapsed ? 'mr-3' : ''}`} />
                  {!isCollapsed && (
                    <div className="text-left flex-1">
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="pt-6">
          <Button
            variant="ghost"
            onClick={onLogout}
            className={`w-full text-destructive hover:text-destructive hover:bg-destructive/10 transition-smooth ${
              isCollapsed ? 'justify-center px-2' : 'justify-start'
            }`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className={`w-5 h-5 flex-shrink-0 ${!isCollapsed ? 'mr-3' : ''}`} />
            {!isCollapsed && 'Logout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
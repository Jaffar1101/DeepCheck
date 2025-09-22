import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  LogOut,
  Settings,
  Mail,
  Github,
  Chrome,
  AlertTriangle
} from 'lucide-react';

interface SettingsSectionProps {
  onLogout: () => void;
}

export function SettingsSection({ onLogout }: SettingsSectionProps) {
  const [notifications, setNotifications] = useState({
    analysisComplete: true,
    weeklyReport: false,
    securityAlerts: true,
    productUpdates: false,
  });
  
  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@deepcheck.ai',
    company: 'DeepCheck Inc.',
    role: 'AI Researcher',
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be emailed to you within 24 hours.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "This action cannot be undone. Please contact support to proceed.",
      variant: "destructive",
    });
  };

  const updateNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="font-orbitron text-4xl font-bold gradient-neon-text">
          Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your account preferences and security settings.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-primary-ai" />
              <h3 className="font-orbitron text-xl font-semibold">
                Profile Information
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="glass border-border/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="glass border-border/30"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    className="glass border-border/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                    className="glass border-border/30"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveProfile}
                variant="ai-gradient"
              >
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="glass p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-primary-human" />
              <h3 className="font-orbitron text-xl font-semibold">
                Notifications
              </h3>
            </div>
            
            <div className="space-y-4">
              {[
                { key: 'analysisComplete', label: 'Analysis Complete', description: 'Get notified when file analysis is finished' },
                { key: 'weeklyReport', label: 'Weekly Reports', description: 'Receive weekly analysis summaries' },
                { key: 'securityAlerts', label: 'Security Alerts', description: 'Important security and privacy notifications' },
                { key: 'productUpdates', label: 'Product Updates', description: 'New features and improvement announcements' },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{label}</div>
                    <div className="text-sm text-muted-foreground">{description}</div>
                  </div>
                  <Switch
                    checked={notifications[key as keyof typeof notifications]}
                    onCheckedChange={() => updateNotification(key as keyof typeof notifications)}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Data & Privacy */}
          <Card className="glass p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-accent-orange" />
              <h3 className="font-orbitron text-xl font-semibold">
                Data & Privacy
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <h4 className="font-semibold mb-2 text-foreground">Data Export</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Download all your analysis data and results in JSON format.
                </p>
                <Button variant="outline" onClick={handleExportData} className="glass">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Account Status */}
          <Card className="glass p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="w-6 h-6 text-primary-ai" />
              <h3 className="font-orbitron text-lg font-semibold">
                Account Status
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <Badge className="bg-gradient-ai text-primary-ai-foreground">Pro</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Analyses This Month</span>
                <span className="font-semibold">47 / 100</span>
              </div>
            </div>
          </Card>

          {/* Connected Accounts */}
          <Card className="glass p-6">
            <h3 className="font-orbitron text-lg font-semibold mb-4">
              Connected Accounts
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <Chrome className="w-5 h-5 text-accent-cyan" />
                  <div>
                    <div className="font-medium text-sm">Google</div>
                    <div className="text-xs text-muted-foreground">demo@gmail.com</div>
                  </div>
                </div>
                <Badge variant="default">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-foreground" />
                  <div>
                    <div className="font-medium text-sm">GitHub</div>
                    <div className="text-xs text-muted-foreground">Not connected</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="glass">
                  Connect
                </Button>
              </div>
            </div>
          </Card>

          {/* Logout */}
          <Card className="glass p-6">
            <Button
              variant="outline"
              onClick={onLogout}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
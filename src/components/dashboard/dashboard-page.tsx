import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardSidebar } from './dashboard-sidebar';
import { UploadSection } from './upload-section';
import { NewsCheckerSection } from './news-checker-section';
import { SocialMediaCheckerSection } from './social-media-checker-section';
import { YouTubeCheckerSection } from './youtube-checker-section';
import { ResultsSection } from './results-section';
import { HistorySection } from './history-section';
import { SettingsSection } from './settings-section';

export type DashboardView = 'upload' | 'news-checker' | 'social-media' | 'youtube-checker' | 'results' | 'history' | 'settings';

interface DashboardPageProps {
  onLogout: () => void;
}

export function DashboardPage({ onLogout }: DashboardPageProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('upload');
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
    setCurrentView('results');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'upload':
        return <UploadSection onAnalysisComplete={handleAnalysisComplete} />;
      case 'news-checker':
        return <NewsCheckerSection onAnalysisComplete={handleAnalysisComplete} />;
      case 'social-media':
        return <SocialMediaCheckerSection onAnalysisComplete={handleAnalysisComplete} />;
      case 'youtube-checker':
        return <YouTubeCheckerSection onAnalysisComplete={handleAnalysisComplete} />;
      case 'results':
        return <ResultsSection results={analysisResults} />;
      case 'history':
        return <HistorySection />;
      case 'settings':
        return <SettingsSection onLogout={onLogout} />;
      default:
        return <UploadSection onAnalysisComplete={handleAnalysisComplete} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-galaxy">
      <div className="flex min-h-screen w-full">
        <DashboardSidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
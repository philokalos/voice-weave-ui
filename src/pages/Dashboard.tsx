import { useState } from "react";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { JournalCard } from "@/components/journal/JournalCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardProps {
  activeTab: 'home' | 'dashboard' | 'profile';
  onTabChange: (tab: 'home' | 'dashboard' | 'profile') => void;
}

// Mock data for demonstration
const mockEntries = [
  {
    id: '1',
    date: '2024-01-20',
    wellDone: ['Completed morning workout', 'Had productive team meeting'],
    regrets: ['Skipped lunch again', 'Stayed up too late'],
    tomorrow: ['Meal prep on Sunday', 'Call mom'],
    keywords: ['productivity', 'health', 'family'],
    duration: 180,
    summary: 'A productive day with good progress on work projects, but need to focus more on self-care.'
  },
  {
    id: '2',
    date: '2024-01-19',
    wellDone: ['Finished quarterly report', 'Helped colleague with project'],
    regrets: ['Forgot to water plants'],
    tomorrow: ['Review feedback', 'Plan weekend activities'],
    keywords: ['work', 'collaboration', 'planning'],
    duration: 145,
  },
  {
    id: '3',
    date: '2024-01-18',
    wellDone: ['Cooked healthy dinner', 'Read 30 pages of book'],
    regrets: ['Procrastinated on emails'],
    tomorrow: ['Clear inbox', 'Go for a walk'],
    keywords: ['cooking', 'reading', 'wellness'],
    duration: 200,
  }
];

export const Dashboard = ({ activeTab, onTabChange }: DashboardProps) => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader 
        title={t('dashboard.title')}
        showMenu={false}
      />

      {/* View mode toggle */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center space-x-1"
            >
              <List className="h-4 w-4" />
              <span>{t('dashboard.list')}</span>
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="flex items-center space-x-1"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>{t('dashboard.calendar')}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-24">
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {mockEntries.length > 0 ? (
              mockEntries.map(entry => (
                <JournalCard
                  key={entry.id}
                  entry={entry}
                  onClick={() => console.log('Open entry:', entry.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('dashboard.noEntries')}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => onTabChange('home')}
                >
                  {t('dashboard.createFirst')}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t('dashboard.calendarSoon')}</p>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
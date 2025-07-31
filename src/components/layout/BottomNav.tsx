import { Home, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface BottomNavProps {
  activeTab: 'home' | 'dashboard' | 'profile';
  onTabChange: (tab: 'home' | 'dashboard' | 'profile') => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'home' as const, icon: Home, label: t('nav.record') },
    { id: 'dashboard' as const, icon: Calendar, label: t('nav.journal') },
    { id: 'profile' as const, icon: User, label: t('nav.profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 safe-area-inset-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "nav-button flex-col space-y-1 h-auto py-2 px-3",
                isActive && "text-primary"
              )}
              aria-label={tab.label}
            >
              <IconComponent 
                className={cn(
                  "h-5 w-5",
                  isActive && "text-primary"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
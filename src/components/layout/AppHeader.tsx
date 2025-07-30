import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  title?: string;
  showMenu?: boolean;
  showSettings?: boolean;
  onMenuClick?: () => void;
  onSettingsClick?: () => void;
}

export const AppHeader = ({ 
  title = "Voice Journal",
  showMenu = false,
  showSettings = true,
  onMenuClick,
  onSettingsClick 
}: AppHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        {showMenu && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="nav-button p-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-heading font-semibold text-foreground">
          {title}
        </h1>
      </div>
      
      {showSettings && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          className="nav-button p-2"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      )}
    </header>
  );
};
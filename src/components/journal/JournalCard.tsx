import { Calendar, Clock, Hash } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface JournalEntry {
  id: string;
  date: string;
  wellDone: string[];
  regrets: string[];
  tomorrow: string[];
  keywords: string[];
  duration?: number;
  summary?: string;
}

interface JournalCardProps {
  entry: JournalEntry;
  onClick?: () => void;
}

export const JournalCard = ({ entry, onClick }: JournalCardProps) => {
  const { t } = useLanguage();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card 
      className="journal-card cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{formatDate(entry.date)}</span>
          </div>
          {entry.duration && (
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatDuration(entry.duration)}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {entry.summary && (
          <p className="text-sm text-muted-foreground italic">
            {entry.summary}
          </p>
        )}

        {entry.wellDone.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-success mb-2">{t('journal.wellDone')}</h4>
            <p className="text-sm line-clamp-2">{entry.wellDone[0]}</p>
            {entry.wellDone.length > 1 && (
              <span className="text-xs text-muted-foreground">
                +{entry.wellDone.length - 1} more
              </span>
            )}
          </div>
        )}

        {entry.keywords.length > 0 && (
          <div className="flex items-center space-x-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {entry.keywords.slice(0, 3).map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
              {entry.keywords.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{entry.keywords.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
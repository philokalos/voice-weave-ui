import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface MicrophoneButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  className?: string;
}

export const MicrophoneButton = ({ 
  isRecording, 
  onToggleRecording, 
  className 
}: MicrophoneButtonProps) => {
  const { t } = useLanguage();
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Button
        onClick={onToggleRecording}
        className={cn(
          "mic-button",
          isRecording && "recording-button"
        )}
        aria-label={isRecording ? t('recording.stopRecordingAria') : t('recording.startRecordingAria')}
      >
        {isRecording ? (
          <Square className="h-8 w-8 fill-current" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </Button>
      
      {/* Recording status indicator */}
      {isRecording && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-recording text-white px-3 py-1 rounded-full text-sm font-medium">
            {t('recording.recording')}
          </div>
        </div>
      )}
    </div>
  );
};
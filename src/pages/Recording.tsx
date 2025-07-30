import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { MicrophoneButton } from "@/components/recording/MicrophoneButton";
import { Waveform } from "@/components/recording/Waveform";
import { RecordingTimer } from "@/components/recording/RecordingTimer";

interface RecordingProps {
  activeTab: 'home' | 'dashboard' | 'search' | 'profile';
  onTabChange: (tab: 'home' | 'dashboard' | 'search' | 'profile') => void;
}

export const Recording = ({ activeTab, onTabChange }: RecordingProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording logic here
      setIsRecording(false);
      // Navigate to review page or show completion
      console.log('Recording stopped after', recordingTime, 'seconds');
    } else {
      // Start recording logic here
      setIsRecording(true);
      console.log('Recording started');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader 
        title="Voice Journal"
        showMenu={false}
        showSettings={true}
      />

      {/* Main recording area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div className="text-center space-y-8 max-w-sm mx-auto">
          {/* Status and timer */}
          <div className="space-y-4">
            {isRecording ? (
              <>
                <RecordingTimer 
                  isRecording={isRecording}
                  onTimeUpdate={setRecordingTime}
                />
                <p className="text-muted-foreground">
                  Speak your thoughts freely
                </p>
              </>
            ) : (
              <>
                <h2 className="text-heading text-center">
                  Ready to reflect?
                </h2>
                <p className="text-muted-foreground">
                  Tap the microphone to start your voice journal
                </p>
              </>
            )}
          </div>

          {/* Waveform visualization */}
          {isRecording && (
            <Waveform isActive={isRecording} className="my-8" />
          )}

          {/* Microphone button */}
          <MicrophoneButton
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
            className="my-8"
          />

          {/* Instructions */}
          {!isRecording && (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Reflect on your day:</p>
              <ul className="space-y-1">
                <li>• What went well?</li>
                <li>• What could be improved?</li>
                <li>• Goals for tomorrow?</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
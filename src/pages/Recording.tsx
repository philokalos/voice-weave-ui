import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { MicrophoneButton } from "@/components/recording/MicrophoneButton";
import { Waveform } from "@/components/recording/Waveform";
import { RecordingTimer } from "@/components/recording/RecordingTimer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Keyboard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RecordingProps {
  activeTab: 'home' | 'dashboard' | 'profile';
  onTabChange: (tab: 'home' | 'dashboard' | 'profile') => void;
}

export const Recording = ({ activeTab, onTabChange }: RecordingProps) => {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [textInput, setTextInput] = useState('');

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
      <AppHeader title={t('recording.title')} showMenu={false} />

      {/* Main recording area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Input mode toggle */}
          <div className="flex bg-muted rounded-xl p-1">
            <button
              onClick={() => setInputMode('voice')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                inputMode === 'voice' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mic className="h-4 w-4" />
              {t('recording.voiceMode')}
            </button>
            <button
              onClick={() => setInputMode('text')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                inputMode === 'text' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Keyboard className="h-4 w-4" />
              {t('recording.textMode')}
            </button>
          </div>

          {inputMode === 'voice' ? (
            // Voice recording mode
            <div className="text-center space-y-8">
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
                      Tap the microphone to start recording
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
          ) : (
            // Text input mode
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-heading text-center">
                  Write your thoughts
                </h2>
                <p className="text-muted-foreground text-center">
                  Type your daily reflection
                </p>
              </div>

              <Textarea
                placeholder={t('recording.textPlaceholder')}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-[200px] resize-none"
              />

              <Button 
                className="w-full" 
                disabled={!textInput.trim()}
                onClick={() => {
                  console.log('Text entry saved:', textInput);
                  setTextInput('');
                }}
              >
                {t('recording.saveEntry')}
              </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
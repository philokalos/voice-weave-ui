import { useEffect, useState } from "react";

interface RecordingTimerProps {
  isRecording: boolean;
  onTimeUpdate?: (time: number) => void;
}

export const RecordingTimer = ({ isRecording, onTimeUpdate }: RecordingTimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newTime = prev + 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => clearInterval(interval);
  }, [isRecording, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRecording && seconds === 0) return null;

  return (
    <div className="text-2xl font-mono font-semibold text-primary">
      {formatTime(seconds)}
    </div>
  );
};
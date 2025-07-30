import { cn } from "@/lib/utils";

interface WaveformProps {
  isActive: boolean;
  className?: string;
}

export const Waveform = ({ isActive, className }: WaveformProps) => {
  return (
    <div className={cn("flex items-center justify-center space-x-1", className)}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 bg-waveform rounded-full transition-all duration-300",
            isActive ? "waveform-animate h-8" : "h-2",
          )}
          style={{
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};
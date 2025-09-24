import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlarmClock, RotateCcw, X } from "lucide-react";
import { Alarm } from "@/types/alarm";

interface AlarmRingingProps {
  alarm: Alarm;
  onSnooze: () => void;
  onDismiss: () => void;
}

export const AlarmRinging = ({ alarm, onSnooze, onDismiss }: AlarmRingingProps) => {
  useEffect(() => {
    // Simple audio feedback (you could add actual alarm sounds here)
    const interval = setInterval(() => {
      // Create a simple beep sound
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.frequency.setValueAtTime(800, context.currentTime);
      gainNode.gain.setValueAtTime(0.3, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.5);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 glass glow-accent animate-pulse">
        <div className="text-center">
          <div className="mb-6">
            <AlarmClock className="w-16 h-16 text-accent mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-accent mb-2">Alarm!</h2>
            <p className="text-lg font-medium">{alarm.label}</p>
            <p className="text-sm text-muted-foreground">
              {alarm.time.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={onSnooze}
              variant="outline"
              className="flex-1 border-alarm-warning text-alarm-warning hover:bg-alarm-warning hover:text-black transition-bounce"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Snooze (5m)
            </Button>
            <Button
              onClick={onDismiss}
              className="flex-1 bg-accent hover:bg-accent-glow glow-accent transition-bounce"
            >
              <X className="w-4 h-4 mr-2" />
              Dismiss
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
import { Alarm } from "@/types/alarm";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlarmItemProps {
  alarm: Alarm;
  onToggle: () => void;
  onDelete: () => void;
}

export const AlarmItem = ({ alarm, onToggle, onDelete }: AlarmItemProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilAlarm = (alarmTime: Date) => {
    const now = new Date();
    let timeDiff = alarmTime.getTime() - now.getTime();
    
    if (timeDiff < 0) {
      // If alarm time has passed today, calculate for tomorrow
      const tomorrow = new Date(alarmTime);
      tomorrow.setDate(tomorrow.getDate() + 1);
      timeDiff = tomorrow.getTime() - now.getTime();
    }
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `in ${hours}h ${minutes}m`;
    }
    return `in ${minutes}m`;
  };

  return (
    <Card className={cn(
      "p-4 glass transition-smooth hover:shadow-lg border-l-4",
      alarm.isActive 
        ? "border-l-alarm-active pulse-ring" 
        : "border-l-muted"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={cn(
              "time-display text-2xl font-bold transition-smooth",
              alarm.isActive ? "text-alarm-active" : "text-muted-foreground"
            )}>
              {formatTime(alarm.time)}
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-medium">{alarm.label}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Volume2 className="w-3 h-3" />
                <span>{alarm.tone}</span>
                {alarm.isActive && (
                  <>
                    <span>•</span>
                    <span className="text-alarm-active font-medium">
                      {getTimeUntilAlarm(alarm.time)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Switch
            checked={alarm.isActive}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-alarm-active"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
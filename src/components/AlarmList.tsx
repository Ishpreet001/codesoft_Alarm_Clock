import { Alarm } from "@/types/alarm";
import { AlarmItem } from "./AlarmItem";
import { Card } from "@/components/ui/card";
import { AlarmClock } from "lucide-react";

interface AlarmListProps {
  alarms: Alarm[];
  onToggleAlarm: (id: string) => void;
  onDeleteAlarm: (id: string) => void;
}

export const AlarmList = ({ alarms, onToggleAlarm, onDeleteAlarm }: AlarmListProps) => {
  if (alarms.length === 0) {
    return (
      <Card className="p-8 glass text-center">
        <AlarmClock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No alarms set</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add your first alarm above to get started
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <AlarmClock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Your Alarms</h3>
        <span className="text-sm text-muted-foreground">({alarms.length})</span>
      </div>
      
      {alarms.map((alarm) => (
        <AlarmItem
          key={alarm.id}
          alarm={alarm}
          onToggle={() => onToggleAlarm(alarm.id)}
          onDelete={() => onDeleteAlarm(alarm.id)}
        />
      ))}
    </div>
  );
};
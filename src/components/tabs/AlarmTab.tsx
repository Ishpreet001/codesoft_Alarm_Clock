import { useState, useEffect } from "react";
import { TimeDisplay } from "@/components/TimeDisplay";
import { AlarmForm } from "@/components/AlarmForm";
import { AlarmList } from "@/components/AlarmList";
import { AlarmRinging } from "@/components/AlarmRinging";
import { Alarm } from "@/types/alarm";
import { useToast } from "@/hooks/use-toast";

interface AlarmTabProps {
  alarms: Alarm[];
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
  ringingAlarm: Alarm | null;
  setRingingAlarm: React.Dispatch<React.SetStateAction<Alarm | null>>;
}

export const AlarmTab = ({ alarms, setAlarms, ringingAlarm, setRingingAlarm }: AlarmTabProps) => {
  const { toast } = useToast();

  const addAlarm = (newAlarm: Omit<Alarm, "id">) => {
    const alarm: Alarm = {
      ...newAlarm,
      id: Date.now().toString()
    };
    
    setAlarms(prev => [...prev, alarm]);
    toast({
      title: "Alarm Set",
      description: `Alarm set for ${newAlarm.time.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      })}`,
    });
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => 
      prev.map(alarm => 
        alarm.id === id 
          ? { ...alarm, isActive: !alarm.isActive }
          : alarm
      )
    );
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
    toast({
      title: "Alarm Deleted",
      description: "The alarm has been removed successfully.",
    });
  };

  const snoozeAlarm = () => {
    if (ringingAlarm) {
      const snoozeTime = new Date(ringingAlarm.time);
      snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);
      
      setAlarms(prev => 
        prev.map(alarm => 
          alarm.id === ringingAlarm.id 
            ? { ...alarm, time: snoozeTime }
            : alarm
        )
      );
      
      setRingingAlarm(null);
      toast({
        title: "Alarm Snoozed",
        description: "The alarm will ring again in 5 minutes.",
      });
    }
  };

  const dismissAlarm = () => {
    if (ringingAlarm) {
      setAlarms(prev => 
        prev.map(alarm => 
          alarm.id === ringingAlarm.id 
            ? { ...alarm, isActive: false }
            : alarm
        )
      );
      
      setRingingAlarm(null);
      toast({
        title: "Alarm Dismissed",
        description: "Have a great day!",
      });
    }
  };

  return (
    <div>
      {/* Current Time Display */}
      <TimeDisplay />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add New Alarm */}
        <div>
          <AlarmForm onAddAlarm={addAlarm} />
        </div>

        {/* Alarm List */}
        <div>
          <AlarmList 
            alarms={alarms}
            onToggleAlarm={toggleAlarm}
            onDeleteAlarm={deleteAlarm}
          />
        </div>
      </div>

      {/* Quick Stats */}
      {alarms.length > 0 && (
        <div className="mt-8 p-4 glass rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            {alarms.filter(a => a.isActive).length} of {alarms.length} alarms active
          </p>
        </div>
      )}

      {/* Ringing Alarm Modal */}
      {ringingAlarm && (
        <AlarmRinging
          alarm={ringingAlarm}
          onSnooze={snoozeAlarm}
          onDismiss={dismissAlarm}
        />
      )}
    </div>
  );
};
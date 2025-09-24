import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Clock, Plus, Volume2 } from "lucide-react";
import { Alarm } from "@/types/alarm";

interface AlarmFormProps {
  onAddAlarm: (alarm: Omit<Alarm, "id">) => void;
}

export const AlarmForm = ({ onAddAlarm }: AlarmFormProps) => {
  const [time, setTime] = useState("07:00");
  const [label, setLabel] = useState("");
  const [tone, setTone] = useState("Default");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const [hours, minutes] = time.split(":").map(Number);
    const alarmTime = new Date();
    alarmTime.setHours(hours, minutes, 0, 0);
    
    // If the time has passed today, set it for tomorrow
    if (alarmTime < new Date()) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    onAddAlarm({
      time: alarmTime,
      label: label || `Alarm ${time}`,
      tone,
      isActive: true,
    });

    setLabel("");
    setTime("07:00");
  };

  return (
    <Card className="p-6 glass transition-smooth hover:shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Set New Alarm</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="time" className="text-sm font-medium">
            Alarm Time
          </Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 time-display text-lg glass border-border focus:border-primary focus:ring-primary"
            required
          />
        </div>

        <div>
          <Label htmlFor="label" className="text-sm font-medium">
            Label (Optional)
          </Label>
          <Input
            id="label"
            type="text"
            placeholder="Wake up for work"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 glass border-border focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="tone" className="text-sm font-medium">
            Alarm Tone
          </Label>
          <div className="flex items-center gap-2 mt-1">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="Default">Default</option>
              <option value="Gentle">Gentle</option>
              <option value="Classic">Classic</option>
              <option value="Chimes">Chimes</option>
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth">
          <Plus className="w-4 h-4 mr-2" />
          Add Alarm
        </Button>
      </form>
    </Card>
  );
};
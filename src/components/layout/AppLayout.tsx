import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlarmTab } from "@/components/tabs/AlarmTab";
import { AboutTab } from "@/components/tabs/AboutTab";
import { Alarm } from "@/types/alarm";
import { AlarmClock, Info } from "lucide-react";

export const AppLayout = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [ringingAlarm, setRingingAlarm] = useState<Alarm | null>(null);

  // Load alarms from localStorage on mount
  useEffect(() => {
    const savedAlarms = localStorage.getItem("alarms");
    if (savedAlarms) {
      const parsedAlarms = JSON.parse(savedAlarms).map((alarm: any) => ({
        ...alarm,
        time: new Date(alarm.time)
      }));
      setAlarms(parsedAlarms);
    }
  }, []);

  // Save alarms to localStorage whenever alarms change
  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  // Check for alarms that should ring
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTimeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const alarmToRing = alarms.find(alarm => {
        if (!alarm.isActive || ringingAlarm) return false;
        
        const alarmTimeString = `${alarm.time.getHours().toString().padStart(2, '0')}:${alarm.time.getMinutes().toString().padStart(2, '0')}`;
        return alarmTimeString === currentTimeString;
      });

      if (alarmToRing) {
        setRingingAlarm(alarmToRing);
      }
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms, ringingAlarm]);

  return (
    <div className="min-h-screen">
      {/* Professional Header */}
      <header className="formal-header sticky top-0 z-40">
        <div className="formal-container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <AlarmClock className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">Codesoft Alarm Clock</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {alarms.filter(a => a.isActive).length} active alarm{alarms.filter(a => a.isActive).length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="formal-container">
        <Tabs defaultValue="alarms" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 glass">
            <TabsTrigger 
              value="alarms" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <AlarmClock className="w-4 h-4" />
              Alarms
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Info className="w-4 h-4" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alarms" className="mt-0">
            <AlarmTab 
              alarms={alarms}
              setAlarms={setAlarms}
              ringingAlarm={ringingAlarm}
              setRingingAlarm={setRingingAlarm}
            />
          </TabsContent>

          <TabsContent value="about" className="mt-0">
            <AboutTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
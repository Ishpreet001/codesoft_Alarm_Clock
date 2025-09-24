import { useState, useEffect } from "react";

export const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="text-center mb-8">
      <div className="time-display text-5xl md:text-7xl font-bold mb-2 text-primary">
        {formatTime(currentTime)}
      </div>
      <div className="text-base md:text-lg text-muted-foreground font-medium">
        {formatDate(currentTime)}
      </div>
    </div>
  );
};
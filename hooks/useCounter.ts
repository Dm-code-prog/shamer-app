// useCounter starts a counter from a given date and returns the current time.
// it formats the time in the format DD:HH:MM, or MM:SS if there are just a few minutes left
import { useState, useEffect } from 'react';

export const useCounter = (startPoint?: Date) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (startPoint) {
        const now = new Date();
        const timeDiff = startPoint.getTime() - now.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        if (days > 0) {
          setTime(`${days}:${hours}:${minutes}`);
        } else if (hours > 0) {
          setTime(`${hours}:${minutes}:${seconds}`);
        } else {
          setTime(`${minutes}:${seconds}`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startPoint]);

  return time;
};

import { useState, useEffect } from 'react';

export const useCounter = (startPoint?: Date) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (startPoint) {
        const now = new Date();
        const timeDiff = startPoint.getTime() - now.getTime();

        // Time calculations
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        // Formatting time based on the length
        if (days > 0) {
          setTime(`${days} days`);
        } else if (hours > 0) {
          setTime(
            `${hours.toString().padStart(2, '0')}:${minutes
              .toString()
              .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
          );
        } else {
          setTime(
            `${minutes.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')}`,
          );
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startPoint]);

  return time;
};

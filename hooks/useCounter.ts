import { useState, useEffect } from 'react';

export const useCounter = (utcStartPoint?: Date) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (utcStartPoint) {
        // Assuming utcStartPoint is given in UTC, convert it to the local time zone
        const localStartPoint = new Date(
          utcStartPoint.getTime() - utcStartPoint.getTimezoneOffset() * 60000,
        );

        const now = new Date();
        const timeDiff = localStartPoint.getTime() - now.getTime();

        // Time calculations
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        // Formatting time
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
  }, [utcStartPoint]);

  return time;
};

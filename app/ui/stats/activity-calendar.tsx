import React from 'react';

interface ActivityCalendarProps {
  activityDates: string[]; // Array of dates in 'YYYY-MM-DD' format
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  activityDates,
}) => {
  const generateDays = (): Date[] => {
    const days: Date[] = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    // First day of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the previous month
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();
    // Day of the week for the first day of the current month (0 - Sunday, 6 - Saturday)
    const startDayOfWeek = firstDayOfMonth.getDay();

    // Adjust startDayOfWeek considering Monday as the first day of the week
    const adjustStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    // Add days from the previous month to align the first day of the current month correctly
    for (let i = adjustStartDay; i > 0; i--) {
      days.push(new Date(year, month - 1, lastDayOfLastMonth - i + 1));
    }

    // Add days of the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Check if the day had activity
  const hadActivity = (day: Date): boolean => {
    // Format both current day and activity days as 'YYYY-MM-DD' for comparison
    const formattedDay = day.toISOString().split('T')[0];
    return activityDates.some((activityDate) => {
      // Directly compare the dates as strings
      return formattedDay === activityDate;
    });
  };

  const days = generateDays();

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => (
        <div
          key={index}
          className={(() => {
            let classes = 'rounded-xl p-4 text-center';
            if (hadActivity(day)) {
              classes += ' bg-green-500 text-white';
            } else if (day.getMonth() !== new Date().getMonth()) {
              classes += ' text-muted opacity-90';
            } else {
              classes += ' bg-muted';
            }
            return classes;
          })()}
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
};

export default ActivityCalendar;

import type { Activity as ActivityT } from '#/domains/challenge/types';
import { Badge } from '#/components/ui/badge';
import { Checkbox } from '#/components/ui/checkbox';
import React from 'react';

type ActivityProps = {
  activity: ActivityT;
  setActivityCompleted: (id: number, completed: boolean) => void;
};

export const ActivityComp = ({
  activity,
  setActivityCompleted,
}: ActivityProps) => {
  let classes = 'bg-card flex w-full justify-between rounded-xl p-4';

  if (activity.is_completed) {
    classes += ' border-green-500 border-4 animate-pulse';
  }

  return (
    <div className={classes}>
      <div>
        <p>
          {activity.n_units} {activity.units} of {activity.type} in{' '}
          {activity.time * 60} min.
        </p>
        {activity.is_extra && (
          <Badge className="bg-primary text-white">Extra</Badge>
        )}
      </div>
      <Checkbox
        disabled={activity.is_completed}
        onCheckedChange={(checked) => {
          setActivityCompleted(activity.id, !!checked);
        }}
      />
    </div>
  );
};

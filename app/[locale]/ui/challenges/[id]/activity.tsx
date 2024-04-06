import type { Activity as ActivityT } from '#/domains/challenge/types';
import { Badge } from '#/components/ui/badge';
import { Checkbox } from '#/components/ui/checkbox';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { useTranslation } from 'react-i18next';

type ActivityProps = {
  activity: ActivityT;
  setActivityCompleted: (id: number, completed: boolean) => void;
};

export const ActivityComp = ({
  activity,
  setActivityCompleted,
}: ActivityProps) => {
  const { t } = useTranslation();

  let classes = 'bg-card flex w-full justify-between rounded-xl p-4';

  if (activity.is_completed) {
    classes += ' border-green-500 border-4';
  }

  const time = (() => {
    if (activity.time > 0 && activity.time < 1) {
      return `in ${activity.time * 60} min`;
    }
    if (activity.time > 0 && activity.time < 24) {
      return `in ${activity.time}` + 'h';
    }

    if (activity.time === 24 || !activity.time) {
      return '';
    }

    return `in ${activity.time / 24} days`;
  })();

  return (
    <div className={classes}>
      <div>
        <p>
          {activity.n_units} {t(`units.${activity.units}`)}{' '}
          {t(`activities.${activity.type}`)}
          {time}
        </p>
        {activity.is_extra && (
          <Badge className="bg-primary text-white">Extra</Badge>
        )}
      </div>
      {activity.is_completed ? (
        <Checkbox checked />
      ) : (
        <Checkbox
          onCheckedChange={(checked) => {
            setActivityCompleted(activity.id, !!checked);
          }}
        />
      )}
    </div>
  );
};

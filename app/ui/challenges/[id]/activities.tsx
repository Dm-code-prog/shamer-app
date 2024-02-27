'use client';
import { Property } from '#/domains/challenge/types';
import { Badge } from '#/components/ui/badge';
import { Checkbox } from '#/components/ui/checkbox';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';

type Props = {
  properties: Property[];
  completedActivities: number[];
};

export const Activities = ({ properties, completedActivities }: Props) => {
  const router = useRouter();

  const [activityIDs, setActivityIDs] =
    React.useState<number[]>(completedActivities);

  const submit = async () => {
    const res = await fetch('/api/challenge/complete', {
      method: 'POST',
      body: JSON.stringify({
        challenge_activity_ids: activityIDs,
      }),
    });

    if (!res.ok) {
      toast.error('Failed to submit activities');
      return;
    }

    toast.success('Activities submitted');
    router.push('/ui/challenges/result?rp=120');
  };

  return (
    <div className="flex w-full flex-grow flex-col items-center gap-4">
      {properties.map((activity, index) => (
        <div
          key={index}
          className="bg-card flex w-full justify-between rounded-xl p-4"
        >
          <div>
            <p>
              {activity.n_units} {activity.unit} of {activity.type} in{' '}
              {activity.time * 60} min.
            </p>
            {activity.is_extra && (
              <Badge className="bg-primary text-white">Extra</Badge>
            )}
          </div>
          {completedActivities.includes(activity.challenge_activity_id) ? (
            <Badge className="bg-green-400 text-white">Completed</Badge>
          ) : (
            <Checkbox
              checked={activityIDs.includes(activity.challenge_activity_id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setActivityIDs([
                    ...activityIDs,
                    activity.challenge_activity_id,
                  ]);
                } else {
                  setActivityIDs(
                    activityIDs.filter(
                      (id) => id !== activity.challenge_activity_id,
                    ),
                  );
                }
              }}
            />
          )}
        </div>
      ))}

      <h2 className="m-2 text-3xl text-green-400">+100 RP</h2>

      <Button className="mt-auto w-full" size="lg" onClick={submit}>
        Submit
      </Button>
    </div>
  );
};

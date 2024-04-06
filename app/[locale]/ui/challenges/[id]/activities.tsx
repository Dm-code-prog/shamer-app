'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';
import {
  Activity,
  CompleteChallengeActivityRequest,
} from '#/domains/challenge/types';
import { ActivityComp } from './activity';
import { rp } from '#/domains/challenge/rp';
import { User } from '#/domains/user/types';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

type Props = {
  properties: Activity[];
  user: User;
  challenge_instance_id: number;
};

export const Activities = ({
  properties,
  challenge_instance_id,
  user,
}: Props) => {
  const router = useRouter();

  const [completedActivities, setCompletedActivities] = React.useState<
    number[]
  >([]);

  const submit = async () => {
    const req = {
      activity_ids: completedActivities,
      challenge_instance_id,
    } satisfies CompleteChallengeActivityRequest;

    const res = await fetch('/api/challenge/complete', {
      method: 'POST',
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      if (res.status === 400) {
        const response = await res.json();
        toast.error(response.error);
        return;
      }

      toast.error('An error occurred');
    }

    toast.success('Activities submitted');
    router.push(`/ui/challenges/result?rp=${rpForActivities}`);
  };

  const hasActivitiesToComplete = properties.some(
    (activity) => !activity.is_completed,
  );

  const rpForActivities = properties.reduce((acc, activity) => {
    if (completedActivities.includes(activity.id)) {
      return (
        acc +
        rp({
          weight: user.age,
          height: user.height,
          age: user.age,
          met: activity.met,
          time: activity.time,
          activityLevel: 1.55,
          intenseLevel: 1,
        })
      );
    }
    return acc;
  }, 0);

  return (
    <div className="flex w-full flex-grow flex-col items-center gap-4">
      {properties.map((activity, index) => (
        <ActivityComp
          activity={activity}
          key={activity.id}
          setActivityCompleted={(id: number, completed) => {
            if (completed) {
              setCompletedActivities([...completedActivities, id]);
            } else {
              setCompletedActivities(
                completedActivities.filter((act) => act !== id),
              );
            }
          }}
        />
      ))}

      {rpForActivities > 0 && user.user_info_is_filled && (
        <h2 className="m-2 text-3xl text-green-400">+{rpForActivities} 🏆</h2>
      )}

      {rpForActivities > 0 && !user.user_info_is_filled && (
        <>
          <h2 className="text-md m-2 text-center text-red-500">
            Please fill your profile to get RP
          </h2>
        </>
      )}

      {hasActivitiesToComplete ? (
        <Button
          className="mt-auto w-64"
          size="lg"
          onClick={submit}
          disabled={completedActivities.length === 0}
        >
          Save
        </Button>
      ) : (
        <Button className="mt-auto w-full" size="lg" disabled>
          Completed
        </Button>
      )}
    </div>
  );
};

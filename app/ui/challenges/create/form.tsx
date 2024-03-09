import { Card, CardContent } from '#/components/ui/card';
import { DrawerSelect } from '#/components/compound/drawer-select';
import { ACTIVITY_TYPES } from '#/app/ui/challenges/create/activity_types';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import { ExtraGoals } from '#/app/ui/challenges/create/extra-goals';
import { ExtraPrize } from '#/app/ui/challenges/create/extra-prize';
import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Label } from '#/components/ui/label';
import { Activity, CreateChallengeRequest } from '#/domains/challenge/types';

type ActivityType = {
  src: string;
  unit: string;
  name: string;
};

export default function CreateChallengeForm({ team_id }: { team_id: string }) {
  const router = useRouter();
  const [activityType, setActivityType] = React.useState<ActivityType>({
    src: '',
    name: '',
    unit: '',
  });

  const [challengeType, setChallengeType] =
    React.useState<string>('group-daily');

  const [activities, setActivities] = React.useState<Partial<Activity>[]>([
    {
      type: activityType.name,
      n_units: 0,
      time: 0.5,
      is_extra: false,
    },
  ]);

  const [name, setName] = React.useState<string>('My challenge');

  const save = async () => {
    const challenge: CreateChallengeRequest = {
      name: name,
      type: challengeType,
      team_id: Number(team_id),
      // @ts-ignore
      activities: activities,
    };

    const res = await fetch('/api/challenge', {
      method: 'POST',
      body: JSON.stringify(challenge),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      toast.success('Challenge created');
    } else {
      toast.error('Error creating challenge');
      return;
    }

    const data = await res.json();
    router.push(`/ui/challenges/${data.id}?preview=true`);
  };

  console.log(activities, 'activities');

  return (
    <>
      <Label className="text-3xl">Name</Label>
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h3 className="text-3xl">Exercises</h3>
      <Card className="flex flex-col items-center p-8">
        <CardContent className="flex w-full flex-col items-center">
          <DrawerSelect
            title="Here are some exercises"
            items={Object.entries(ACTIVITY_TYPES).map(([key, value]) => ({
              value: key,
              src: value.icon,
            }))}
            onSelect={({ src, value, text }) => {
              const activityType = {
                src: src!,
                name: value,
                // @ts-ignore
                unit: ACTIVITY_TYPES[value].unit,
              } satisfies ActivityType;

              setActivityType(activityType);
              setActivities((prev) => [
                {
                  ...prev[0],
                  type: activityType.name,
                },
              ]);
            }}
          >
            {activityType.src ? (
              <div>
                <Image
                  src={activityType.src}
                  alt={activityType.name}
                  width={64}
                  height={64}
                />
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="h-24 w-24 rounded-xl"
              >
                Pick exercises
              </Button>
            )}
          </DrawerSelect>

          <div className="flex w-full flex-col gap-4 py-4">
            {activityType.unit && (
              <div className="flex w-full flex-col gap-2">
                <h3 className="text-sm">Targets</h3>
                <div className="flex w-full gap-4 ">
                  <Input
                    placeholder={activityType.unit}
                    className="w-full border-white"
                    value={activities[0].n_units}
                    onChange={(e) => {
                      setActivities((prev) => [
                        {
                          ...prev[0],
                          n_units: parseFloat(e.target.value) || 0,
                          type: activityType.name,
                        },
                      ]);
                    }}
                  />
                  <Select
                    value={activities[0]?.time?.toString()}
                    onValueChange={(value) => {
                      setActivities((prev) => [
                        {
                          ...prev[0],
                          time: parseFloat(value),
                          type: activityType.name,
                        },
                      ]);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">30 minutes</SelectItem>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex w-full flex-col gap-2">
              <h3 className="text-sm">Type</h3>
              <Select
                defaultValue="group-daily"
                value={challengeType}
                onValueChange={(value) => {
                  setChallengeType(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group-daily">Daily</SelectItem>
                  <SelectItem value="group-weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-around">
            <ExtraGoals />
            <ExtraPrize />
          </div>
        </CardContent>
      </Card>

      <Button size="lg" className="mt-auto w-64" onClick={save}>
        Save
      </Button>
    </>
  );
}

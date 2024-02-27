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

import { EditIcon } from '#/components/icons/edit';
import { Label } from '#/components/ui/label';

type ActivityType = {
  src: string;
  unit: string;
  name: string;
};

type Property = {
  type: string;
  n_units: number;
  time: number;
  is_extra: boolean;
};

type Challenge = {
  name: string;
  type: string;
  team_id: string;
  properties: Property[];
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

  const [properties, setProperties] = React.useState<Property[]>([
    {
      type: activityType.name,
      n_units: 0,
      time: 0.5,
      is_extra: false,
    },
  ]);

  const [name, setName] = React.useState<string>('My challenge');

  const [isEditingName, setIsEditingName] = React.useState<boolean>(true);

  const save = async () => {
    const challenge: Challenge = {
      name: name,
      type: challengeType,
      team_id: team_id,
      properties: properties,
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
    router.push(`/ui/challenges/${data.id}`);
  };

  return (
    <>
      {isEditingName ? (
        <div className="flex w-full flex-col items-start gap-4">
          <Label className="text-2xl font-bold">Challenge name</Label>
          <Card className="flex flex-col gap-2">
            <div className="flex">
              <Input
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                size="sm"
                variant="link"
                className="self-end"
                onClick={() => setIsEditingName(false)}
              >
                OK{' '}
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="relative">
          <h2 className="text-5xl font-bold">{name}</h2>
          <EditIcon
            className="fill-primary-foreground absolute bottom-2 right-[-32px] h-6 w-6"
            onClick={() => setIsEditingName(true)}
          />
        </div>
      )}
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
                    value={properties[0].n_units}
                    onChange={(e) => {
                      setProperties((prev) => [
                        {
                          ...prev[0],
                          n_units: parseFloat(e.target.value) || 0,
                          type: activityType.name,
                        },
                      ]);
                    }}
                  />
                  <Select
                    value={properties[0].time.toString()}
                    onValueChange={(value) => {
                      setProperties((prev) => [
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

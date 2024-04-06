'use client';
import { Card, CardContent } from '#/components/ui/card';
import { DrawerSelect } from '#/components/compound/drawer-select';
import { ACTIVITY_TYPES } from '#/app/[locale]/ui/challenges/create/activity_types';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import { ExtraGoals } from '#/app/[locale]/ui/challenges/create/extra-goals';
import { ExtraPrize } from '#/app/[locale]/ui/challenges/create/extra-prize';
import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Label } from '#/components/ui/label';
import {
  Activity,
  CreateChallengeRequest,
  CreateChallengeRequestSchema,
} from '#/domains/challenge/types';
import { useTranslation } from 'react-i18next';

type ActivityType = {
  src: string;
  unit: string;
  name: string;
};

export default function CreateChallengeForm({ team_id }: { team_id: string }) {
  const { t } = useTranslation();

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
    try {
      const challenge: CreateChallengeRequest = {
        name: name,
        type: challengeType,
        team_id: Number(team_id),
        // @ts-ignore
        activities: activities,
      };

      CreateChallengeRequestSchema.parse(challenge);

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
    } catch (e) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <Label className="text-3xl">{t('form.name.title')}</Label>
      <Input
        placeholder={t('form.name.placeholder')}
        value={name}
        onChange={(e) => {
          if (e.target.value.length >= 0 && e.target.value.length < 30) {
            setName(e.target.value);
          }
        }}
      />

      <h3 className="text-3xl">{t('form.exercises.title')}</h3>
      <Card className="flex flex-col items-center p-8">
        <CardContent className="flex w-full flex-col items-center">
          <DrawerSelect
            title={t('form.exercises.placeholder')}
            items={Object.entries(ACTIVITY_TYPES).map(([key, value]) => ({
              value: key,
              src: value.icon,
            }))}
            onSelect={({ src, value, text }) => {
              const activityType = {
                src: src!,
                // @ts-ignore
                name: ACTIVITY_TYPES[value].name,
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
                {t('form.exercises.placeholder')}
              </Button>
            )}
          </DrawerSelect>

          <div className="flex w-full flex-col gap-4 py-4">
            {activityType.unit && (
              <div className="flex w-full flex-col gap-2">
                <h3 className="text-sm">{t('form.exercises.target.title')}</h3>
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
                      <SelectItem value="0.5">
                        {t('form.exercises.target.options.30')}
                      </SelectItem>
                      <SelectItem value="1">
                        {t('form.exercises.target.options.1')}
                      </SelectItem>
                      <SelectItem value="2">
                        {t('form.exercises.target.options.2')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex w-full flex-col gap-2">
              <h3 className="text-sm">{t('form.exercises.type.title')}</h3>
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
                  <SelectItem value="group-daily">
                    {t('form.exercises.type.options.daily')}
                  </SelectItem>
                  <SelectItem value="group-weekly">
                    {t('form.exercises.type.options.weekly')}
                  </SelectItem>
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
        {t('form.save')}
      </Button>
    </>
  );
}

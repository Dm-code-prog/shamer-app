'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  CreateTeamRequest,
  CreateTeamRequestSchema,
} from '#/domains/team/types';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { BackNavigation } from '#/components/compound/back-navigation';
import { DrawerSelect } from '#/components/compound/drawer-select';
import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Card, CardContent } from '#/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { Textarea } from '#/components/ui/textarea';
import { Label } from '#/components/ui/label';
import { Switch } from '#/components/ui/switch';
import { Button } from '#/components/ui/button';
import { useTranslation } from 'react-i18next';

export const CreateTeamForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [emoji, setEmoji] = React.useState('🏆');

  const form = useForm<CreateTeamRequest>({
    resolver: zodResolver(CreateTeamRequestSchema),
    defaultValues: {
      name: '',
      description: '',
      emoji: emoji,
      is_public: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await fetch('/api/team', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error('Failed to create team');
    }

    const { team } = await res.json();
    if (team.id) {
      toast.success('Team created');
      router.push(`/ui/team/${team.id}`);
    }
  });

  return (
    <>
      <BackNavigation />
      <DrawerSelect
        title="Which emoji do you like?"
        items={[
          {
            value: '🏆',
            text: '🏆',
          },
          {
            value: '🥇',
            text: '🥇',
          },
          {
            value: '🏅',
            text: '🏅',
          },
        ]}
        onSelect={(value) => {
          setEmoji(value.value);
        }}
      >
        <Avatar className="h-16 w-16">
          <AvatarFallback key="fallback" className="text-3xl">
            {emoji}
          </AvatarFallback>
        </Avatar>
      </DrawerSelect>
      <Form {...form}>
        <h3 className="text-left text-3xl font-bold">
          {t('createTeamForm.title')}
        </h3>
        <form
          className="flex w-full flex-grow flex-col items-center gap-8"
          onSubmit={onSubmit}
        >
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm">
                  {t('createTeamForm.name.title')}
                </p>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t('createTeamForm.name.placeholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm">
                  {t('createTeamForm.bio.title')}
                </p>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={t('createTeamForm.bio.placeholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label>{t('createTeamForm.public.label')}</Label>
                <FormField
                  control={form.control}
                  name="is_public"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Button size="lg" className="mt-auto w-64" type="submit">
            {t('createTeamForm.save')}
          </Button>
        </form>
      </Form>
    </>
  );
};

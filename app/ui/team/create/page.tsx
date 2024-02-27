'use client';

import { BackNavigation } from '#/components/compound/back-navigation';
import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Button } from '#/components/ui/button';
import React from 'react';
import { Card, CardContent } from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Textarea } from '#/components/ui/textarea';
import { Switch } from '#/components/ui/switch';
import { Label } from '#/components/ui/label';
import { DrawerSelect } from '#/components/compound/drawer-select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '#/components/ui/form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'The name is too short',
  }),
  emoji: z.string().min(1),
  description: z.string().optional(),
  is_public: z.boolean(),
});

type TeamInfo = z.infer<typeof formSchema>;

export default function Page() {
  const router = useRouter();

  const [emoji, setEmoji] = React.useState('🏆');

  const form = useForm<TeamInfo>({
    resolver: zodResolver(formSchema),
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
        <h3 className="text-left text-3xl font-bold">Team info</h3>
        <form
          className="flex w-full flex-grow flex-col items-center gap-8"
          onSubmit={onSubmit}
        >
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm">Name</p>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="How about Lifters HQ?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm">BIO</p>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your team"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label>Make public</Label>
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
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}

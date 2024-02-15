'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import React from 'react';
import { Textarea } from '#/components/ui/textarea';
import { Button } from '#/components/ui/button';
import { useRouter } from 'next/navigation';
import { Switch } from '#/components/ui/switch';

const formSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(300),
  is_public: z.boolean().optional(),
});

type TeamInfoItem = z.infer<typeof formSchema>;

async function submit(values: TeamInfoItem) {
  const req = formSchema.parse(values);
  const res = await fetch('/api/team', {
    method: 'POST',
    body: JSON.stringify(req),
  });

  if (res.ok) {
    return;
  }

  throw new Error('Failed to create a team');
}

export const TeamForm = () => {
  const router = useRouter();

  const form = useForm<TeamInfoItem>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: TeamInfoItem) {
    try {
      await submit(values);
      toast.success('Team created');
      router.push('/ui');
    } catch (error) {
      toast.error('Failed to create a team');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input placeholder="How about Lifters HQ?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell everyone about your team!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_public"
          render={({ field }: { field: any }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Switch {...field} />
              </FormControl>
              <FormLabel>Make public</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="link" className="w-full">
          Copy Invite link
        </Button>
        <Button className="w-full">Create team</Button>
      </form>
    </Form>
  );
};

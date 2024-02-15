'use client';
import { Input } from '#/components/ui/input';
import { Button } from '#/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';
import toast from 'react-hot-toast';

const formSchema = z.object({
  weight: z.coerce
    .number({
      invalid_type_error: 'Weight is required',
    })
    .positive()
    .max(500, {
      message: 'Weight must be less than 500',
    }),
  height: z.coerce
    .number({
      invalid_type_error: 'Height is required',
    })
    .positive()
    .max(220),
  age: z.coerce
    .number({
      invalid_type_error: 'Age is required',
    })
    .positive()
    .max(100),
});

type UserInfoItem = z.infer<typeof formSchema>;

async function submit(values: z.infer<typeof formSchema>) {
  const req = formSchema.parse(values);
  const res = await fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(req),
  });

  if (res.ok) {
    return;
  }

  throw new Error('Failed to update profile');
}

export const ProfileForm = () => {
  const router = useRouter();

  const form = useForm<UserInfoItem>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submit(values);
      toast.success('Profile updated');
      router.push('/start/team');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 flex w-full flex-col gap-8"
      >
        <Card className="flex flex-col items-center">
          <CardHeader>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1 className="text-center text-xl">Let's get to know u!</h1>
          </CardHeader>

          <CardContent className="flex w-full flex-col">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="72" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="180" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="18" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" className="w-full" size="lg">
          {form.formState.isSubmitting ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </Form>
  );
};

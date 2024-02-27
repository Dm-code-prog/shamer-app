'use client';
import React from 'react';
import { Input } from '#/components/ui/input';
import { Card, CardContent } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '#/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const formSchema = z.object({
  age: z.coerce.number().min(10),
  weight: z.coerce.number().min(42),
  height: z.coerce.number().min(120),
});

type UserProfile = z.infer<typeof formSchema>;

export const Info = ({ profile }: { profile: UserProfile }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<UserProfile>({
    resolver: zodResolver(formSchema, {}),
    defaultValues: profile || {},
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error('Failed to save profile');
    }

    toast.success('Profile saved');
    setIsEditing(false);
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-grow flex-col items-center gap-8"
        onSubmit={onSubmit}
      >
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="bg-muted flex justify-between gap-2 rounded-xl px-4">
              <div className="flex w-full flex-col items-start">
                <h2 className="w-full">Age</h2>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="18" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {profile?.age ? `${profile?.age} years` : 'Unknown'}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-muted flex justify-between gap-2 rounded-xl px-4">
              <div className="flex w-full flex-col items-start">
                <h2 className="w-full">Weight</h2>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="80" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {profile?.weight ? `${profile?.weight} kg` : 'Unknown'}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-muted flex justify-between gap-2 rounded-xl px-4">
              <div className="flex w-full flex-col items-start">
                <h2 className="w-full">Height</h2>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="180" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {profile?.height ? `${profile?.height} cm` : 'Unknown'}
                  </p>
                )}
              </div>
            </div>
            {isEditing && (
              <Button
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            )}
          </CardContent>
        </Card>
        {isEditing ? (
          <Button type="submit" className="mt-auto w-64">
            Save
          </Button>
        ) : (
          <Button
            onClick={(event) => {
              event.preventDefault();
              setIsEditing(true);
            }}
            className="mt-auto w-64"
          >
            Edit
          </Button>
        )}
      </form>
    </Form>
  );
};

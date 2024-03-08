'use client';

import toast from 'react-hot-toast';
import { revalidatePath } from 'next/cache';
import { Button } from '#/components/ui/button';
import React from 'react';

type Props = {
  team_id: number;
};

export const Join = ({ team_id }: Props) => {
  const joinTeam = async () => {
    const response = await fetch(`/api/team/join`, {
      method: 'PUT',
      body: JSON.stringify({ team_id }),
    });
    if (response.ok) {
      toast.success('Welcome to the team!');
      revalidatePath(`/ui/team/${team_id}`);
    } else {
      toast.error('An error occurred');
    }
  };

  return (
    <Button
      variant="secondary"
      className="mt-auto w-full"
      size="lg"
      onClick={joinTeam}
    >
      Join team
    </Button>
  );
};

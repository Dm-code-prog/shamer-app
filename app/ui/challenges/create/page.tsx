'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const CreateChallengeForm = dynamic(() => import('./form'), {
  ssr: false,
});

export default function Page({
  searchParams,
}: {
  searchParams: { team_id: string };
}) {
  return <CreateChallengeForm team_id={searchParams.team_id} />;
}

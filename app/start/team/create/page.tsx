import React from 'react';
import { Card, CardContent } from '#/components/ui/card';
import { TeamForm } from './form';

export default function Page() {
  return (
    <>
      <Card>
        <CardContent className="flex w-full flex-col">
          <TeamForm />
        </CardContent>
      </Card>
    </>
  );
}

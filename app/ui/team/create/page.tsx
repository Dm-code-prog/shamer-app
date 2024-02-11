import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import React from 'react';
import { Card, CardContent } from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Textarea } from '#/components/ui/textarea';
import { Button } from '#/components/ui/button';

export default function Page() {
  return (
    <>
      <Avatar className="border-primary h-32 w-32 border-4">
        <AvatarImage src="#" />
        <AvatarFallback>SH</AvatarFallback>
      </Avatar>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="Team name" />
          <Textarea placeholder="Team description" />
        </CardContent>
      </Card>
      <Button variant="link" className="w-full">
        Copy Invite link
      </Button>
      <Button className="w-full">Create team</Button>
    </>
  );
}

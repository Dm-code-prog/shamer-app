import React from 'react';
import { ProfileForm } from '#/app/ui/profile/start/form';
import { Header } from '#/components/ui/header';

export default function Page() {
  return (
    <>
      <Header withBackNavigation withLogo />
      <ProfileForm />
    </>
  );
}

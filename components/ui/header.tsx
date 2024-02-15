'use client';
import { BackNavigation } from '#/components/ui/back-navigation';
import { ShamerLogo } from '#/components/ui/shamer-logo';
import React from 'react';

type Props = {
  withLogo?: boolean;
  withBackNavigation?: boolean;
};

export const Header = ({ withBackNavigation, withLogo }: Props) => {
  return (
    <div className="min-h-18 flex w-full max-w-[420px] flex-col items-center">
      {withBackNavigation && (
        <div className="absolute left-6">
          <BackNavigation />
        </div>
      )}
      {withLogo && (
        <div className="flex w-full justify-center">
          <ShamerLogo />
        </div>
      )}
    </div>
  );
};

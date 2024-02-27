'use client';
import { BackNavigation } from '#/components/compound/back-navigation';
import { ShamerLogo } from '#/components/compound/shamer-logo';
import React from 'react';

type Props = {
  withLogo?: boolean;
  withBackNavigation?: boolean;
};

export const Header = ({ withBackNavigation, withLogo }: Props) => {
  return (
    <div className="min-h-18 left-0 flex w-full flex-col items-center">
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

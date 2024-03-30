'use client';
import { Button } from '#/components/ui/button';
import toast from 'react-hot-toast';

type Props = {
  code: string;
};

export const CopyInviteCode = ({ code }: Props) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copied the invite code');
  };

  return (
    <Button className="mt-auto w-64" size="lg" onClick={copyToClipboard}>
      Copy invite code
    </Button>
  );
};

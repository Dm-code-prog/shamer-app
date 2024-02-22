import { Header } from '#/components/ui/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header withBackNavigation />
      {children}
    </>
  );
}

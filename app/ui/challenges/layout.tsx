import { Header } from '#/components/compound/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header withBackNavigation />
      {children}
    </>
  );
}

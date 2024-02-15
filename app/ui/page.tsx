import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';

const emoji = '\u{1F603}';

export default async function Page() {
  return (
    <>
      <Avatar>
        <AvatarFallback key="fallback" className="text-2xl">
          {emoji}
        </AvatarFallback>
      </Avatar>
    </>
  );
}

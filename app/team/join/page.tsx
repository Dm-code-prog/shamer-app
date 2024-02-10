import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { Tab } from '#/ui/tab';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';

export default function () {
  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl font-black">Public groups</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Lifters HQ</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We never do cardio!
              </p>
            </div>
            <Button size="sm">Join</Button>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Shameless</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We're all about that cardio!
              </p>
            </div>
            <Button size="sm">Join</Button>
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">CEOs</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Executives for CEO only. No employees allowed.
              </p>
            </div>
            <Button size="sm">Join</Button>
          </div>
        </CardContent>
      </Card>
      <Input placeholder="Use invite code" />
    </>
  );
}
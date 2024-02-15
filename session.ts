import 'server-only';

import { cookies } from 'next/headers';
import { getUserDataBySessionToken, UserData } from '#/data/sessions';

export const getSession = async (): Promise<null | UserData> => {
  const shamerSession = cookies().get('shamer_session');
  if (!shamerSession) {
    return null;
  }
  const { user_id, user_info_is_filled } = await getUserDataBySessionToken(
    shamerSession.value,
  );

  return { user_id, user_info_is_filled };
};

export const mustSession = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error('No session');
  }
  return session;
};

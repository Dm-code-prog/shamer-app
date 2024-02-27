import 'server-only';

import { cookies } from 'next/headers';
import {
  getUserDataBySessionToken,
  UserData,
} from '#/domains/user/server/sessions';

export const getSession = async (): Promise<null | UserData> => {
  const shamerSession = cookies().get('shamer_session');
  if (!shamerSession) {
    return null;
  }
  return getUserDataBySessionToken(shamerSession.value);
};

export const mustSession = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error('No session');
  }
  return session;
};

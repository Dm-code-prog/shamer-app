const queryString =
  'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>\nhash=<hash>';

const splitted = queryString.split('\n');

const hash = splitted.find((s) => s.startsWith('hash='))?.split('=')[1];

console.log(hash);

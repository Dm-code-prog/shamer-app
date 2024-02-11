import crypto from 'crypto';

export const verifyTelegramHmac = (initData: string): boolean => {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');

  const fields = Array.from(params.keys()).filter((k) => k !== 'hash');

  // Sort fields alphabetically and format them
  const dataCheckString = fields
    .sort()
    .map((key) => `${key}=${params.get(key)}`)
    .join('\n');

  // Calculate the secret key
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.TELEGRAM_TOKEN!)
    .digest();

  // Calculate HMAC-SHA-256 signature of the data-check-string with the secret key
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return hmac === hash;
};

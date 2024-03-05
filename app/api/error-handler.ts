export const handleAPIRouteError = (
  e: unknown,
  request?: Record<string, unknown>,
  route?: string,
) => {
  console.error({
    message: `api error: ${e}`,
    request,
  });
};

export function formatResponse(
  data: any,
  errorCode: number,
  message: string,
  errors: any,
) {
  return {
    data: data,
    errorCode: errorCode,
    message: message,
    errors: errors,
  };
}

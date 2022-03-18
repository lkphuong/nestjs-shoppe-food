export function formatResponse(
  data: any,
  errorCode: number,
  message: string,
  erros: any,
) {
  return {
    data: data,
    errorCode: errorCode,
    message: message,
    erros: erros,
  };
}

export const apiMessage = (
  isSuccess: boolean,
  code: number,
  message?: string,
  payload?: any,
) => ({
  isSuccess,
  code,
  message,
  payload,
});

export interface IApiResponse<T> {
  isSuccess: boolean;
  payload: T;
  message: string;
  code: number;
}

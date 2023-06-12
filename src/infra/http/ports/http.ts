export type HttpRequest = {
  body?: any;
  query?: any
}

export type HttpResponse<T = any> = {
  status: number;
  data: T;
}
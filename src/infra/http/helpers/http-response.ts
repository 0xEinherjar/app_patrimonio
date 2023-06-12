import { HttpResponse } from "../ports/http";

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  status: 200,
  data
})

export const created = <T = any> (data: T): HttpResponse<T> => ({
  status: 201,
  data
})

export const badRequest = (error: any): HttpResponse<Error> => ({
  status: 400,
  data: error
})

export const conflict = (message: string): HttpResponse<string> => ({
  status: 409,
  data: message
})

export const unauthorized = (message: string): HttpResponse<string> => ({
  status: 401,
  data: message
})

export const forbidden = (message: any): HttpResponse<any> => ({
  status: 403,
  data: message
})

export const serverError = (): HttpResponse<any> => ({
  status: 500,
  data: "Internal server error"
})
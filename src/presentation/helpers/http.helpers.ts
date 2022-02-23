import { HttpResponse } from "../protocols";

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
}) 

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
}) 
import type { Request } from 'express'

type EmptyObject = Record<string, never>
type APIEmptyResponse = EmptyObject
type ApiEmptyRequestBody = EmptyObject

type TypedRequest<
  TPathParams = EmptyObject,
  TReqBody = Record<string, unknown>,
  TQueryParams = Record<string, unknown>,
> = Request<TPathParams, Record<string, unknown>, TReqBody, TQueryParams>

export type { ApiEmptyRequestBody, APIEmptyResponse, EmptyObject, TypedRequest }

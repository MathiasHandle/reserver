import type { Request } from 'express'

type EmptyObject = Record<string, never>

type APIEmptyResponse = EmptyObject
type ApiEmptyRequestBody = EmptyObject
type ApiEmptyPathParams = EmptyObject
type ApiEmptyQueryParams = EmptyObject

type TypedRequest<
  TPathParams = ApiEmptyPathParams,
  TReqBody = ApiEmptyRequestBody,
  TQueryParams = ApiEmptyQueryParams,
> = Request<TPathParams, Record<string, unknown>, TReqBody, TQueryParams>

export type { ApiEmptyPathParams, ApiEmptyRequestBody, APIEmptyResponse, TypedRequest }

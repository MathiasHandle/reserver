import type { Request } from 'express'

type EmptyObject = Record<string, never>
type APIEmptyResponse = EmptyObject

type TypedRequest<
  PathParams = EmptyObject,
  ReqBody = Record<string, unknown>,
  QueryParams = Record<string, unknown>,
> = Request<PathParams, Record<string, unknown>, ReqBody, QueryParams>

export type { APIEmptyResponse, TypedRequest, EmptyObject }

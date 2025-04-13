import httpCodes from '@/constants/httpCodes'
import { UnauthorizedError } from '@/services/error'
import { createUser, deleteUser, getAllUsers, getUserByCredentials } from '@/services/user'
import type {
  ApiEmptyPathParams,
  ApiEmptyRequestBody,
  APIEmptyResponse,
  TypedRequest,
} from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import { promisify } from 'node:util'
import type {
  CheckAuthResponse,
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserPathParams,
  DeleteUserResponse,
  GetAllUsersResponse,
  LoginUserRequestBody,
  LoginUserResponse,
} from './userTypes'

async function handleGetAllUsers(
  _: TypedRequest,
  res: Response<GetAllUsersResponse>,
  next: NextFunction
) {
  try {
    const users = await getAllUsers()

    res.status(httpCodes.OK).json({ users: users ?? [] })
  } catch (err) {
    next(err)
  }
}

async function handleCreateUser(
  req: TypedRequest<ApiEmptyPathParams, CreateUserRequestBody>,
  res: Response<CreateUserResponse>,
  next: NextFunction
) {
  try {
    await createUser(req.body)

    res.status(httpCodes.CREATED).json({})
  } catch (err) {
    next(err)
  }
}

async function handleDeleteUser(
  req: TypedRequest<DeleteUserPathParams>,
  res: Response<DeleteUserResponse>,
  next: NextFunction
) {
  try {
    const userIdInt = parseInt(req.params.userId)
    await deleteUser(userIdInt)

    res.status(httpCodes.OK).json()
  } catch (err) {
    next(err)
  }
}

async function handleLogin(
  req: TypedRequest<ApiEmptyPathParams, LoginUserRequestBody>,
  res: Response<LoginUserResponse>,
  next: NextFunction
) {
  try {
    const user = await getUserByCredentials(req.body)

    // Regenerate session and save user data to it
    await promisify(req.session.regenerate).call(req.session)
    req.session.user = user

    res.status(httpCodes.OK).json({ user })
  } catch (err) {
    next(err)
  }
}

function handleGetCurrentUser(
  req: TypedRequest<ApiEmptyPathParams, ApiEmptyRequestBody>,
  res: Response<CheckAuthResponse>,
  next: NextFunction
) {
  try {
    if (!req.session.user) {
      const unauthorizedError = new UnauthorizedError<null>({
        detail: null,
      })

      return next(unauthorizedError)
    }

    res.status(httpCodes.OK).json({ user: req.session.user })
  } catch (err) {
    next(err)
  }
}

async function handleLogout(
  req: TypedRequest<ApiEmptyPathParams, ApiEmptyRequestBody>,
  res: Response<APIEmptyResponse>,
  next: NextFunction
) {
  try {
    await promisify(req.session.destroy).call(req.session)

    res.status(httpCodes.OK).json({})
  } catch (err) {
    next(err)
  }
}

export default {
  handleGetAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleLogin,
  handleGetCurrentUser,
  handleLogout,
}

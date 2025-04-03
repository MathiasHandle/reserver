import httpCodes from '@/constants/httpCodes'
import { NotFoundError } from '@/services/error'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByCredentials,
  getUserById,
} from '@/services/user'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Request, Response } from 'express'
import { promisify } from 'node:util'
import type {
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserPathParams,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserByIdPathParams,
  GetUserByIdResponse,
  LoginUserRequestBody,
  LoginUserResponse,
} from './userTypes'

async function handleGetAllUsers(
  _: Request,
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

async function handleGetUserById(
  req: TypedRequest<GetUserByIdPathParams>,
  res: Response<GetUserByIdResponse>,
  next: NextFunction
) {
  try {
    const userIdInt = parseInt(req.params.userId)
    const user = await getUserById(userIdInt)

    if (!user) {
      const notFoundError = new NotFoundError({
        message: 'User not found',
        status: httpCodes.UNPROCESSABLE_ENTITY,
        detail: null,
      })

      return next(notFoundError)
    }

    res.status(httpCodes.OK).json({ user })
  } catch (err) {
    next(err)
  }
}

async function handleCreateUser(
  req: TypedRequest<Record<never, never>, CreateUserRequestBody>,
  res: Response<CreateUserResponse>,
  next: NextFunction
) {
  try {
    console.log(req.params)
    await createUser(req.body)

    res.status(httpCodes.CREATED).json()
  } catch (err) {
    next(err)
  }
}

async function handleDeleteUser(
  req: Request<DeleteUserPathParams>,
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
  req: Request<LoginUserRequestBody>,
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

export default {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleDeleteUser,
  handleLogin,
}

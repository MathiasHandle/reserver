import { getAllUsers, getUserById, deleteUser, createUser } from '@/services/user'
import { Request, Response } from 'express'

import { createInsertSchema } from 'drizzle-zod'

import httpCodes from '@/constants/httpCodes'
import { usersSchema } from '@/model/users'
import type { User } from '@/model/users'
import { UsersInsert } from '@/model/users/users'

type GetAllUsersResponse = {
  users: User[]
}

type ErrorResponse = {
  message: string
}

async function handleGetAllUsers(_: Request, res: Response<GetAllUsersResponse | ErrorResponse>) {
  try {
    const users = await getAllUsers()

    res.status(httpCodes.OK).json({ users })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

type GetUserPathParams = {
  userId: string
}

type GetUserByIdResponse = {
  user: User
}

async function handleGetUserById(req: Request<GetUserPathParams>, res: Response<GetUserByIdResponse | ErrorResponse>) {
  try {
    const userId = parseInt(req.params.userId)
    const user = await getUserById(userId)

    res.status(httpCodes.OK).json({ user })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

async function handleCreateUser(req: Request<{}, {}, UsersInsert>, res: Response) {
  // Validate request body
  try {
    const userSchema = createInsertSchema(usersSchema)
    userSchema.parse(req.body)
  } catch (err) {
    console.error(err)
    res.status(httpCodes.BAD_REQUEST).json(err)
  }

  // Create user
  try {
    await createUser(req.body)

    res.status(httpCodes.CREATED).json({})
  } catch (err) {
    console.error(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

type DeleteUserRequest = {
  userId: number
}

async function handleDeleteUser(req: Request<{}, {}, DeleteUserRequest>, res: Response) {
  try {
    const result = await deleteUser(req.body.userId)

    res.status(httpCodes.OK).json(result)
  } catch (err) {
    console.error(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

export default {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleDeleteUser,
}

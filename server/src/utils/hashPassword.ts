import { SCRYPT_KEYLEN } from '@/constants/scrypt'
import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

/**
 * Hashes a password using scrypt algorithm. A random salt is used for each password.
 * @param password Password to hash.
 * @returns String in format of `salt:hashed_password`
 */
async function hashPassword(password: string) {
  // Generates random salt for each password
  const salt = randomBytes(16)

  const hashedPassword = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer

  return `${salt.toString('hex')}:${hashedPassword.toString('hex')}`
}

export default hashPassword

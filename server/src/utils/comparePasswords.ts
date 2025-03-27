import { SCRYPT_KEYLEN } from '@/constants/scrypt'
import { scrypt } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

/**
 * Verifies a password against a stored hash.
 * @param password The password to verify - plain string.
 * @param storedHash The stored hash in format `salt:hashed_password`
 * @returns boolean indicating if password matches
 */
async function comparePasswords(password: string, storedHash: string) {
  try {
    // Split stored hash into salt and hash parts
    const [saltHex, storedKeyHex] = storedHash.split(':')
    const salt = Buffer.from(saltHex, 'hex')

    // Hash the provided password with the same salt
    const hashedPassword = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer

    // Compare the hashes
    return storedKeyHex === hashedPassword.toString('hex')
  } catch (err) {
    console.error(err)
    return false
  }
}

export default comparePasswords

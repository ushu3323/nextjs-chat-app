import { User } from '../../entities'
import { UsernameInUse } from './errors'

export class UserService {
  private static users: User[] = []

  /**
   * Creates an user, validating first if the username is available
   * @throws {UsernameInUse} The username is already in use, cannot create a User
   * @returns User created
   */
  static create (username: string): User {
    if (this.usernameExists(username)) {
      throw new UsernameInUse('Username already in use')
    }

    const user = new User(this.users.length + 1, username)
    this.users.push(user)

    return user
  }

  static getUser (id: number) {
    const user = this.users.find(user => user.id === id) ?? null
    return user
  }

  static remove (id: number) {
    const user = this.users.splice(this.users.findIndex(u => u.id === id), 1)[0]
    return user
  }

  static usernameExists (username: string) {
    const user = this.users.find(u => u.username === username)
    return !!user
  }
}

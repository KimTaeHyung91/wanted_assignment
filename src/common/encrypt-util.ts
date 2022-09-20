import * as crypto from 'crypto';

export class EncryptUtil {
  private constructor() {}

  static encryptPw(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 1, 32, 'sha512')
      .toString('base64');
  }

  static createSalt() {
    return crypto.randomBytes(32).toString('base64');
  }
}

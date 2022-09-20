import { EncryptUtil } from '../common/encrypt-util';

export class PostPolicy {
  private _password: string;

  set password(password: string) {
    this._password = password;
  }
  checkPassword(password: string, salt: string) {
    if (this._password !== EncryptUtil.encryptPw(password, salt)) {
      throw new Error('비밀번호가 틀립니다');
    }
  }
}

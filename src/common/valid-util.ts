export class ValidUtil {
  private constructor() {}

  static isNull(value: any): boolean {
    return value === null || value === undefined || value === '';
  }
}

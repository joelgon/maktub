export default class BaseError extends Error {
  error: { statusCode: number; message: string };

  public constructor(message: string, code: number) {
    super();

    this.error = { statusCode: code, message };
  }
}

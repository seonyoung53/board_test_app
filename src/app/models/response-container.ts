export interface Response<T> {
  code: number;
  message: string;
  data: T;
}

export enum ResultCode {
  OK = 200,
  Accepted = 202,
  NotFound = 300,
  AlreadyReg = 301,
  NotFoundMember = 302,
  NotFoundInfo = 303,
  AlreadyRegEmail = 304,
  AlreadyRegMobile = 305,
  BadRequest = 400,
  BadRequestHeader = 400,
  BadRequestStructure = 400,
  Unauthorized = 401,
  Forbidden = 403,
  InternalServer = 500,
  UnsupportedOperation = 501,
  PwUnauthorized = 3003,
  AccountLock = 3004,
  NotRegMember = 500,
  DatabaseError = 512,
  PW_UNAUTHORIZED = 3003,
  PW_ALREADY_USE = 3005
}

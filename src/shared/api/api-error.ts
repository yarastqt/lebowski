export class ApiError extends Error {
  constructor(public code: string, public message: string) {
    super(message)
  }
}

export enum ApiErrorCode {
  AddresseeNotFound = 'ADDRESSEE_NOT_FOUND',
  RequesterNotFound = 'REQUESTER_NOT_FOUND',
}

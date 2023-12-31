export class ApiError extends Error {
  constructor(public code: string, public message: string) {
    super(message)
  }
}

export enum ApiErrorCode {
  AddresseeNotFound = 'ADDRESSEE_NOT_FOUND',
  RequesterNotFound = 'REQUESTER_NOT_FOUND',
  UserIsNotFriend = 'USER_IS_NOT_FRIEND',
  WalletCurrencyIsNotAllowed = 'WALLET_CURRENCY_IS_NOT_ALLOWED',
  WalletIsAlreadyExists = 'WALLET_IS_ALREADY_EXISTS',
}

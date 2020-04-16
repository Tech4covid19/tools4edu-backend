export interface Auth {
  name?: string,
  email?: string,
  password?: string,
  accessToken?: string,
  refreshToken?: string,
  needPasswordChange?: boolean
}

export interface AuthenticateModel {
  userNameOrEmailAddress: string;

  password: string;

  rememberClient?: boolean;
}

import { ApiError } from "../core";

import { BaseService } from "./base";

import { HttpStatusCode } from "../enums";

import { TOKEN as _ } from "../../configs";

import { jwtTool, PasswordManager } from "../tools";

import { AuthenticateModel } from "../dto/requests";

import { AuthenticateResultModel } from "../dto/responses";

import { UserRepository } from "../../dataAccess/repositories";

class AuthService extends BaseService<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  public authenticate = async (request: AuthenticateModel) => {
    try {
      const { userNameOrEmailAddress, password } = request;

      const user = await this._repos.findByUsername(userNameOrEmailAddress);

      if (!user) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          "username is not already exist, please register"
        );
      }

      const isValidPassword = await PasswordManager.compare(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          "Password is not match, try again."
        );
      }

      const userId = user.id;

      const payload = {
        userId,
      };

      const options = _.OPTIONS;

      const accessToken = await jwtTool.createToken(payload);

      const response: AuthenticateResultModel = {
        accessToken,
        encryptedAccessToken: "string",
        expireInSeconds: options.expiresIn,
        userId,
      };

      return response;
    } catch (error) {
      throw error;
    }
  };
}

Object.seal(AuthService);
export { AuthService };

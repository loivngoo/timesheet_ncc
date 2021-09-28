import { BaseController } from "./base";
import { UserService } from "../services";
import { Request, NextFunction, Response } from "express";
import { CreateUserDTO } from "../dto/requests";
import { IResponse } from "../core/responses/interfaces";
import { UserDTO } from "../dto/common/UserDto";
import { GridParam } from "../dto/requests/GridParam";
import { ApiResponse } from "../core";

class UserController extends BaseController<UserService> {
  constructor() {
    super(new UserService());
  }

  public getAllPagging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filter: GridParam = req.body;
      const result = await this._business.getAllPagging(filter);
      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: CreateUserDTO = req.body;

      const result: UserDTO = await this._business.create(user);

      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getUserNotPagging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this._business.getUserNotPagging();
      const response: IResponse = {
        ...ApiResponse,
        result,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getAllManager = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this._business.getAllManager();
      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(UserController);
export { UserController };

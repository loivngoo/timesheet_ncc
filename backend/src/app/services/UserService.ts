import { ApiError } from "../core";

import { BaseService } from "./base";

import { HttpStatusCode } from "../enums";

import { CreateUserDTO } from "../dto/requests";

import { UserDTO } from "../dto/common/UserDto";

import { GridParam } from "../dto/requests/GridParam";

import pick from "../helpers/pick";

import {
  GetAllUserDto,
  GetUserDto,
  PagedResultRoleDto,
  ProjectUsersDto,
  PUDto,
  RoleDto,
} from "../dto/responses";

import {
  ProjectRepository,
  ProjectUsersRepository,
  RoleRepository,
  UserRepository,
} from "../../dataAccess/repositories";

class UserService extends BaseService<UserRepository> {
  private _projectRepos = new ProjectRepository();

  private _roleRepos = new RoleRepository();

  private _projectUsersRepos = new ProjectUsersRepository();

  constructor() {
    super(new UserRepository());
  }

  public delete = async (id: number): Promise<boolean> => {
    return await this._repos.delete(id);
  };

  public update = async (item: UserDTO): Promise<UserDTO> => {
    try {
      return await this._repos.save(item);
    } catch (error) {
      throw new ApiError(HttpStatusCode.BAD_REQUEST, `Error is: ${error}`);
    }
  };

  public get = async (id: number): Promise<UserDTO> => {
    return await this._repos.findById(id);
  };

  public resetPassword = async (
    adminPassword: string,
    id: number,
    newPassword: string
  ) => {
    try {
      return await this._repos.resetPassword(adminPassword, id, newPassword);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in business: ${error}`
      );
    }
  };

  public active = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.active(id);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in business: ${error}`
      );
    }
  };

  public deactive = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.deactive(id);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in business: ${error}`
      );
    }
  };

  public getRoles = async (): Promise<PagedResultRoleDto> => {
    try {
      const items = await this._roleRepos.getRoles();

      return { items: items, totalCount: null };
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in business: ${error}`
      );
    }
  };

  public updateOwnAvatar = async (
    id: number,
    path: string
  ): Promise<string> => {
    try {
      return await this._repos.setAvatar(id, path);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in business: ${error}`
      );
    }
  };

  public create = async (user: CreateUserDTO): Promise<UserDTO> => {
    try {
      const isExist = await this._repos.findByUsername(user.username);

      if (isExist) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          `username is already exist, try again`
        );
      }

      const result: UserDTO = await this._repos.save(user);

      return result;
    } catch (error) {
      throw error;
    }
  };

  public getUserNotPagging = async (): Promise<GetUserDto[]> => {
    try {
      return await this._repos.getUserNotPagging();
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in business: ${error}`
      );
    }
  };

  public getAllManager = async (): Promise<GetUserDto[]> => {
    try {
      return await this._repos.getAllManager();
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public getAllPagging = async (filter: GridParam) => {
    try {
      const items = [];

      let users: UserDTO[] = await this._repos.getAllPagging(filter);

      for (let user of users) {
        user = pick(user, [
          "username",
          "name",
          "surname",
          "emailAddress",
          "phoneNumber",
          "address",
          "isActive",
          "fullName",
          "roleNames",
          "type",
          "salary",
          "salaryAt",
          "startDateAt",
          "allowedLeaveDay",
          "userCode",
          "jobTitle",
          "level",
          "registerWorkDay",
          "managerId",
          "branch",
          "sex",
          "avatarPath",
          "morningWorking",
          "morningStartAt",
          "morningEndAt",
          "afternoonWorking",
          "afternoonStartAt",
          "afternoonEndAt",
          "isWorkingTimeDefault",
          "isStopWork",
          "id",
        ]);

        const manager: UserDTO = await this._repos.findManager(user.managerId);

        const projectUsers: PUDto[] = [];

        const pus: ProjectUsersDto[] =
          await this._projectUsersRepos.findByUserId(user.id);

        for (let pu of pus) {
          const project = await this._projectRepos.findById(pu.projectId);

          const pms = await this._repos.findProjectManagers(project.id);

          await projectUsers.push({
            projectId: project.id,
            projectCode: project.code,
            projectName: project.name,
            projectUserType: pu.type,
            pms,
          });
        }

        const item = await {
          ...user,
          projectUsers,
          managerAvatarPath: manager.avatarPath,
          managerName: manager.name,
        };

        await items.push(item);
      }

      return {
        totalCount: users.length,
        items,
      };
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };
}

Object.seal(UserService);
export { UserService };

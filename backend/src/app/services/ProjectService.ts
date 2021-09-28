import {
  ProjectTaskRepository,
  ProjectUsersRepository,
  ProjectRepository,
  CustomerRepository,
  UserRepository,
} from "../../dataAccess/repositories";

//import {ProjectUsersRepository} from '../../dataAccess/repositories';

import { ApiError } from "../core";
import { CustomerDto } from "../dto/common/CustomerDto";

import { ProjectDto } from "../dto/common/ProjectDto";
import { GetProjectDto, ProjectIncludingTaskDto } from "../dto/responses";
import { ProjectUsersDto, ProjectTasksDto } from "../../app/dto/responses";

import { BaseService } from "./base";
import { IProjectTask } from "src/interfaces";

class ProjectService extends BaseService<ProjectRepository> {
  private _taskRepos = new ProjectTaskRepository();

  private _projectUsersRepos = new ProjectUsersRepository();

  private _projectTasksRepos = new ProjectTaskRepository();

  private _customerRepos = new CustomerRepository();

  private _userRepos = new UserRepository();

  constructor() {
    super(new ProjectRepository());
  }

  public getAll = async (
    status: number,
    searchKey: string
  ): Promise<GetProjectDto[]> => {
    try {
      let result: GetProjectDto[] = [];

      /**
       * Find project by filter
       */
      const projects: ProjectDto[] = await this._repos.findProjectByFilter(
        status,
        searchKey
      );
      /**----------------------------- */

      /**
       * Handle project
       */
      for (let project of projects) {
        const { id, code, status, projectType, timeStart, timeEnd, name } =
          project;

        /**
         * Find customer by customerId
         */
        const customer: CustomerDto =
          await this._customerRepos.findCustomerByCustomerId(
            project.customerId
          );
        /**----------------------------- */

        /**
         * Find active member
         */
        const activeMember: number =
          await this._projectUsersRepos.findActiveMembers(project.id);
        /**----------------------------- */

        /**
         * Find project managers
         */
        const pms: string[] = await this._userRepos.findProjectManagers(
          project.id
        );
        /**----------------------------- */

        const item: GetProjectDto = await {
          id,
          code,
          name,
          status,
          pms,
          timeEnd,
          timeStart,
          projectType,
          activeMember,
          customerName: customer.name,
        };

        await result.push(item);
      }
      /**---------------------------------------------------------------------- */

      return result;
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public save = async (item: ProjectDto): Promise<ProjectDto> => {
    try {
      const tasks: ProjectTasksDto[] = [];
      const users: ProjectUsersDto[] = [];
      const projectTasks: ProjectTasksDto[] = item.tasks;

      const projectUsers: ProjectUsersDto[] = item.users;

      const project: ProjectDto = await this._repos.save(item);

      const id: number = project.id;

      for (let task of projectTasks) {
        task.projectId = id;
        const created: ProjectTasksDto = await this._projectTasksRepos.save(
          task
        );
        tasks.push(created);
      }

      for (let user of projectUsers) {
        user.projectId = id;
        const created: ProjectUsersDto = await this._projectUsersRepos.save(
          user
        );
        users.push(created);
      }

      project.tasks = await tasks;
      project.users = await users;

      return project;
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public inActive = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.inActive(id);
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public active = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.active(id);
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public delete = async (id: number): Promise<boolean> => {
    try {
      await this._repos.delete(id);
      await this._projectTasksRepos.deleteMany(id);
      await this._projectUsersRepos.deleteMany(id);
      return true;
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public get = async (id: number) => {
    //return ProjectDto
    try {
      return await this._repos.get(id);
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public getProjectIncludingTasks = async (
    userId: number
  ): Promise<ProjectIncludingTaskDto[]> => {
    const result: ProjectIncludingTaskDto[] = [];

    const projectsOfUser: ProjectUsersDto[] =
      await this._projectUsersRepos.findByUserId(userId);

    for (let projectOfUser of projectsOfUser) {
      const tasks: ProjectTasksDto[] = [];

      const projectId = projectOfUser.projectId;

      const project: ProjectDto = await this._repos.findById(projectId);

      const customer: CustomerDto =
        await this._customerRepos.findCustomerByCustomerId(project.customerId);

      await this._projectTasksRepos
        .findByProjectId(projectId)
        .then((task) => tasks.push(task))
        .catch((err) => console.log(err));

      const listPM: string[] = await this._userRepos.findProjectManagers(
        projectId
      );

      const item: ProjectIncludingTaskDto = {
        projectName: project.name,
        customerName: customer.name,
        projectCode: project.code,
        projectUserType: projectOfUser.type,
        targetUsers: [],
        id: projectId,
        listPM,
        tasks,
      };

      result.push(item);
    }

    return result;
  };

  public getFilter = async () => {
    //return [GetProjectFilterDto]
  };

  public getProjectPM = async () => {
    //return [GetProjectFilterDto]
  };

  public getProjectUser = async () => {
    //return [GetProjectFilterDto]
  };
}

Object.seal(ProjectService);
export { ProjectService };

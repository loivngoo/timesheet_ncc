import { PUDto } from "..";
import { Branch, Level, ProjectType, Sex } from "../../../enums";

export interface GetAllUserDto {
  username: string;
  name: string;
  surname: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  fullName: string;

  roleNames: string[];

  projectUsers: PUDto[];

  type: ProjectType;

  salary: number;
  salaryAt: string;
  startDateAt: string;
  allowedLeaveDay: number;
  userCode: string;
  jobTitle: string;

  level: Level;
  registerWorkDay: string;
  avatarPath: string;
  managerId: number;
  managerAvatarPath: string;

  managerName: string;
  branch: Branch;
  sex: Sex;
  creationTime: string;
  morningWorking: number;

  morningStartAt: string;

  morningEndAt: string;

  afternoonWorking: number;

  afternoonStartAt: number;

  afternoonEndAt: string;

  id: number;
}

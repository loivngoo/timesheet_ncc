import { IBase } from "./IBase";

import { TypeUser, Level, Branch, Sex } from "../app/enums";

export interface IUser extends IBase {
  id: number;

  username: string;

  name: string;

  surname: string;

  fullName: string;

  emailAddress: string;

  phoneNumber: string;

  address: string;

  isActive: boolean;

  isStopWork: boolean;

  roleNames: string[];

  password: string;

  type: TypeUser;

  jobTitle: string;

  level: Level;

  allowedLeaveDay: number;

  startDateAt: string;

  salary: number;

  salaryAt: string;

  userCode: string;

  managerId: number;

  branch: Branch;

  sex: Sex;

  morningWorking: string;

  morningStartAt: string;

  morningEndAt: string;

  afternoonWorking: string;

  afternoonStartAt: string;

  afternoonEndAt: string;

  isWorkingTimeDefault: boolean;

  registerWorkDay: string;

  avatarPath: string;
}

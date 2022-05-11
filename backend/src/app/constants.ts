export const ACTIVE_USER: boolean = true;

export const DEACTIVE_USER: boolean = false;

export const APPROVE_TIMESHEET: number = 2;

export const REJECT_TIMESHEET: number = 3;

export const ACTIVE_PROJECT: number = 0;

export const INACTIVE_PROJECT: number = 1;

export const CONFIGURATION_WORKING_TIME = {
  "0": {
    morningStartAt: "08:30",
    morningEndAt: "12:00",
    afternoonStartAt: "13:00",
    afternoonEndAt: "17:30",
    morningWorking: "3.5",
    afternoonWorking: "4.5",
    id: 0,
  },
  "1": {
    morningStartAt: "08:00",
    morningEndAt: "12:00",
    afternoonStartAt: "13:00",
    afternoonEndAt: "17:00",
    morningWorking: "4",
    afternoonWorking: "4",
    id: 0,
  },
  "2": {
    morningStartAt: "08:30",
    morningEndAt: "12:00",
    afternoonStartAt: "13:00",
    afternoonEndAt: "17:30",
    morningWorking: "3.5",
    afternoonWorking: "4.5",
    id: 0,
  },
  "3": {
    morningStartAt: "08:30",
    morningEndAt: "12:00",
    afternoonStartAt: "13:00",
    afternoonEndAt: "17:30",
    morningWorking: "3.5",
    afternoonWorking: "4.5",
    id: 0,
  },
};

export const FAKE_TIMEKEEPING = {
  timekeepingId: 0,
  userId: 0,
  username: "string",
  userType: 0,
  userEmail: "string",
  avatarPath: "string",
  branch: 0,
  date: "2021-09-29T01:55:35.435Z",
  registrationTimeStart: "string",
  registrationTimeEnd: "string",
  checkIn: "string",
  checkOut: "string",
  resultCheckIn: 0,
  resultCheckOut: 0,
  editByUserId: 0,
  editByUserName: "string",
  status: 0,
  userNote: "string",
  noteReply: "string",
};

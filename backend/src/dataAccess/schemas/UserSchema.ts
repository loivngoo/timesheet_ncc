import * as mongoose from "mongoose";

import { TypeUser, Level, Branch, Sex } from "../../app/enums";

import { IUser } from "../../interfaces";

import { PasswordManager } from "../../app/tools";

const UserSchema: mongoose.Schema = new mongoose.Schema<IUser>({
  id: { type: Number },

  username: { type: String, required: true },

  name: { type: String, require: true },

  surname: { type: String, require: true },

  password: { type: String, require: true },

  emailAddress: { type: String, require: true },

  phoneNumber: { type: String },

  address: { type: String },

  isActive: { type: Boolean },

  roleNames: [String],

  type: { type: Number, enum: TypeUser },

  jobTitle: { type: String },

  level: { type: Number, enum: Level },

  registerWorkDay: { type: String },

  allowedLeaveDay: { type: Number },

  startDateAt: { type: String },

  salary: { type: Number },

  salaryAt: { type: String },

  userCode: { type: String },

  managerId: { type: Number },

  branch: { type: Number, enum: Branch },

  sex: { type: Number, enum: Sex },

  morningWorking: { type: String },
  morningStartAt: { type: String },
  morningEndAt: { type: String },
  afternoonWorking: { type: String },
  afternoonStartAt: { type: String },
  afternoonEndAt: { type: String },

  isWorkingTimeDefault: { type: Boolean },

  avatarPath: { type: String },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    user.password = await PasswordManager.hash(user.password);
    next();
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  await PasswordManager.compare(candidatePassword, this.password)
    .then((value) => {
      return value;
    })
    .catch((err) => {
      return err;
    });
};

export { UserSchema };

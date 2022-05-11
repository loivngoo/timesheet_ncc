import { UserController } from "../../app/controllers/UserController";

import { BaseRouter } from "../base";

import { upload } from "../../app/core";

import { authenticator, Authorization } from "../../app/core";

class UserRouter extends BaseRouter {
  private controller: UserController = new UserController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post(
      "/UpdateYourOwnAvatar",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      upload.single("file"),
      this.controller.updateOwnAvatar
    );

    this._router.get(
      "/GetRoles",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.getRoles
    );

    this._router.post(
      "/create",
      // authenticator.authenticate,
      // Authorization.confirm("ADMIN"),
      this.controller.create
    );

    this._router.get(
      "/GetAllManager",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.getAllManager
    );

    this._router.delete(
      "/delete",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.delete
    );

    this._router.get(
      "/getUserNotPagging",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.getUserNotPagging
    );

    this._router.post(
      "/GetAllPagging",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.getAllPagging
    );

    this._router.post(
      "/ActiveUser",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.active
    );

    this._router.post(
      "/DeactiveUser",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.deactive
    );

    this._router.post(
      "/UpdateAvatar",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      upload.single("file"),
      this.controller.updateAvatar
    );

    this._router.post(
      "/ResetPassword",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.resetPassword
    );

    this._router.get(
      "/get",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.get
    );

    this._router.put(
      "/update",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.update
    );
  }
}
export { UserRouter };

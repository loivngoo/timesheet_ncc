import { Document, model, Schema } from "mongoose";
import { HttpStatusCode } from "../../../app/enums";
import { ApiError } from "../../../app/core";

/**
 * Lack of interface, need to implement 2 interfaces more, IWrite<T>, IRead<T>
 */
abstract class BaseRepository<T extends Document> {
  public _model;
  constructor(modelName: string, schema: Schema) {
    this._model = model<T>(modelName, schema);
  }

  public generateId = async () => {
    const id: number = Math.floor(Math.random() * 1000000);

    const isValid = await this.findById(id);

    if (!isValid) {
      return id;
    } else {
      this.generateId();
    }
  };

  public save = async (item: T): Promise<T> => {
    try {
      if (item.id && (await this._model.updateOne({ id: item.id }, item))) {
        return await this.findById(item.id);
      } else {
        const id: number = await this.generateId();

        const model = new this._model({
          ...item,
          id,
        });

        return await model.save();
      }
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Error in repository: ${error}`
      );
    }
  };

  public update = async (item: T) => {
    try {
      const id = item.id;

      return await this._model.updateOne(id, item as T);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Error in repository: ${error}`
      );
    }
  };

  public delete = async (id: number) => {
    try {
      return await this._model.deleteOne({ id });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Error in repository: ${error}`
      );
    }
  };

  public findById = async (id: number): Promise<T> => {
    try {
      return await this._model.findOne({ id: id });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Error in repository, can not find id`
      );
    }
  };

  public findByUsername = async (username: string) => {
    try {
      return await this._model.findOne({ username });
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    }
  };

  public findbyName = async (name: string) => {
    try {
      return await this._model.findOne({ name });
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    }
  };

  public retrieve = async () => {
    try {
      const items = await this._model.find();

      return items
        ? items
        : new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    } catch (error) {
      throw error;
    }
  };
}

Object.seal(BaseRepository);
export { BaseRepository };

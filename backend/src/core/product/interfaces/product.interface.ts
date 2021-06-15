import { Document } from 'mongoose';
import { IBase } from '../../base/interfaces';

export interface IProduct extends IBase, Document {
	_id: string;
	name: string;
	ID: string;
	type: string;
	category: string;
	price: number;
	description: string;
	thumbnailId?: string;
	images?: [string];
}
import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Map Schema for TypeScript.
 * @param type:string
 * @param slackUserName:string
 * @param chatworkRoomId:string
 * @param chatworkAccountId:string
 */
export interface IMap extends Document {
	type: string;
	slackUserName: string;
	chatworkRoomId: string;
	slackChannelId: string;
    chatworkAccountId: string;
}

const mapSchema: Schema = new Schema({
	type: {
		type: String,
		required: true
	},
	slackUserName: {
		type: String,
		required: true
	},
	chatworkRoomId: {
		type: String,
		required: true
	},
	slackChannelId: {
		type: String,
		required: true
	},
    chatworkAccountId: {
		type: String,
		required: true
	}
});

const Map: Model<IMap> = model("map", mapSchema);

export default Map;

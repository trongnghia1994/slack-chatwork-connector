import * as express from "express";
import Map, { IMap } from "../models/map";
import ChatworkApi from "chatwork-api-client";

const apiToken = process.env.chatWorkApi_TOKEN;
const chatWorkApi = new ChatworkApi(apiToken);

const router = express.Router();

router.post('/', async (req: any, res: any) => {
  	console.log("Request body", req.body);
	const slackCwMap = await Map.findOne({type: "SLACK_CHATWORK"});
	const chatworkRoomId = slackCwMap.chatworkRoomId;
	const slackUserName = slackCwMap.slackUserName;
	const message = req.body.text;
	try {
		const resp = await chatWorkApi.postRoomMessage(chatworkRoomId, { body: message });
		console.log("CW API Resp", resp);
		res.send(`Sent to Chatwork OK: *${message}*`);
	} catch (err) {
		console.log(err);
		res.send(`Sent to Chatwork failed: *${message}*`);
	}
});

export default router;

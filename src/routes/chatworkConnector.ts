import * as express from "express";
import dotenv from "dotenv";
import { MAP } from "../mock";
import ChatworkApi from "chatwork-api-client";

// initialize configuration
dotenv.config();

const apiToken = process.env.chatWorkApi_TOKEN;
const chatWorkApi = new ChatworkApi(apiToken);

const router = express.Router();
 
router.post('/', async (req: any, res: any) => {
  	console.log(req.body);
	const cwRoomId = MAP.chatWorkRoomId;
	const slackUserName = MAP.slackUserName;
	const message = req.body.text;
	try {
		const resp = await chatWorkApi.postRoomMessage(cwRoomId, { body: message });
		console.log("CW API Resp", resp);
		res.send(`Sent to Chatwork OK: *${message}*`);
	} catch (err) {
		console.log(err);
		res.send(`Sent to Chatwork failed: *${message}*`);
	}
});

export default router;

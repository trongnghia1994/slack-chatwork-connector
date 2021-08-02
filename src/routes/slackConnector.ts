import * as express from "express";
import Map, { IMap } from "../models/map";
import { post } from '../util/http';

const postMessage = post(process.env.SLACK_HOOK)({ Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` })

const router = express.Router();

router.post('/', async (req: any, res: any) => {
	// {
	// 	webhook_setting_id: '10896',
	// 	webhook_event_type: 'message_created',
	// 	webhook_event_time: 1627891783,
	// 	webhook_event: {
	// 		message_id: '1473954690461962240',
	// 		room_id: 238825393,
	// 		account_id: 6135544,
	// 		body: 'Hello',
	// 		send_time: 1627891782,
	// 		update_time: 0
	// 	}
	// }
	console.log("Request body", req.body);
	const slackCwMap = await Map.findOne({ type: "SLACK_CHATWORK" });
	// This message is from the Slack sender
	const chatworkAccountId = String(req.body.webhook_event.account_id);
	if (slackCwMap.chatworkAccountId === chatworkAccountId) {
		console.log("Did not send to Slack")
		res.send("Did not send to Slack");
		return;
	}
	const message = `From ${req.body.webhook_event.account_id} (Chatwork): ${req.body.webhook_event.body}`;
	const slackChannelId = slackCwMap.slackChannelId;
	try {
		// Call the chat.postMessage method using the WebClient
		const result = await postMessage({ text: message, as_user: true });
		// console.log(result);
		res.send(`Sent to Slack OK: *${message}*`);
	}
	catch (error) {
		console.error(error);
		res.send(`Sent to Slack OK: *${message}*`);
	}
});

export default router;

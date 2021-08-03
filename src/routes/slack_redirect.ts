import * as express from "express";
import { WebClient } from "@slack/web-api";

const web_client = new WebClient();


const router = express.Router();

router.get('/', async (req: any, res: any) => {
	console.log("Request param", req.query);
	const code = req.query.code;
	const result = await web_client.oauth.v2.access({
		client_id: process.env.SLACK_CLIENT_ID,
		client_secret: process.env.SLACK_CLIENT_SECRET,
		code
	});
	console.log("Oauth result", result);
	// Oauth result {
	// 	ok: true,
	// 	app_id: 'A029FHGBUJZ',
	// 	authed_user: {
	// 		id: 'U7BTEUF7F',
	// 		scope: 'admin,channels:history,channels:read,channels:write,chat:write',
	// 		access_token: 'xoxp-250881416199-249932967253-2329328429078-a849501b3cedd9a399f22aa313e54514',
	// 		token_type: 'user'
	// 	},
	// 	team: { id: 'T7CRXC85V', name: 'Be a great' },
	// 	enterprise: null,
	// 	is_enterprise_install: false,
	// 	response_metadata: {}
	// 	}
		res.send('OK');
	});

export default router;

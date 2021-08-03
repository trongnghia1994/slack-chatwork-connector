// app.ts
// initialize configuration
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import chatWorkConnector from "./routes/chatworkConnector";
import slackConnector from "./routes/slackConnector";
import slackOauth from "./routes/slack_redirect";
import connectDB from "./config/database";

connectDB();

// Create Express app
const app = express()

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// A sample route, now plays as a web hook for Slack

// Use the routes
app.use('/chatworkCon', chatWorkConnector);
app.use('/slackCon', slackConnector);
app.use('/api/v1/slack_oauth', slackOauth);

const port = parseInt(process.env.APP_PORT)

// Start the Express server
app.listen(port, () => console.log(`Server running on port ${port}!`))

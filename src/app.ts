// app.ts
// initialize configuration
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import chatWorkConnector from "./routes/chatworkConnector";
import slackConnector from "./routes/slackConnector";
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

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))

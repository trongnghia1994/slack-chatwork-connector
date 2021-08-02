// app.ts
import express from "express";
import chatWorkConnector from "./routes/chatworkConnector";
import dotenv from "dotenv";
import connectDB from "./config/database";

// initialize configuration
dotenv.config();
connectDB();

// Create Express app
const app = express()

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// A sample route, now plays as a web hook for Slack

// Use the routes
app.use('/', chatWorkConnector);

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))

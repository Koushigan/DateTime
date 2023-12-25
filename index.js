import express from "express";
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", function (request, response) {
    response.send("Node server is up");
});

// Creating date and time
const date_time = new Date();
const date = ("0" + date_time.getDate()).slice(-2);
const month = ("0" + (date_time.getMonth() + 1)).slice(-2);
const year = date_time.getFullYear();
const hours = ("0" + date_time.getHours()).slice(-2);
const minutes = ("0" + date_time.getMinutes()).slice(-2);
const seconds = ("0" + date_time.getSeconds()).slice(-2);
const currentDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

// Adding a new text file to a folder
app.post("/createfile", async function (request, response) {
    try {
        await new Promise((resolve, reject) => {
            fs.writeFile(`./textFile/${currentDateTime}.txt`, currentDateTime, (err) => {
                if (err) {
                    console.error("Error creating file:", err);
                    reject(err);
                } else {
                    console.log("File created:", currentDateTime);
                    resolve(); 
                }
            });
        });
        response.send("File created: " + currentDateTime);
    } catch (error) {
        console.error("Internal Server Error:", error);
        response.status(500).send("Internal Server Error");
    }
});

// Retrieving the added text files
app.get("/files", function (request, response) {
    fs.readdir("./textFile/", (err, files) => {
        if (err) {
            console.error("Error reading files:", err);
            response.status(500).send("Internal Server Error");
        } else {
            console.log("Available files:", files);
            response.send(files);
        }
    });
});

// Endpoint to get current date and time
app.get("/datetime", function (request, response) {
    const currentDateTime = new Date().toLocaleString();
    response.send("Current Date and Time: " + currentDateTime);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

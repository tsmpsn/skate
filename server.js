const express = require("express");
const {google} = require("googleapis");
const path = require('path');
const ejs = require('ejs');
const app = express();

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
  
app.get("/", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient();

    // Create client instance for auth
    const googleSheets = google.sheets({version: "v4", auth: client});

    // Get spreadsheet metadata
    const spreadsheetId = "1E5gE-qTzks3oG--GCaA0bDM7ulBN4Jap8B_Hlv4H_bo";

    const metaData = await googleSheets.spreadsheets.get({
        auth, 
        spreadsheetId
    });

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "bonker-lastresortab!E:I"
    });
    
    // Remove header row
    getRows.data.values.shift();
    let dataArray = getRows.data.values;
    res.render('shoes', itemList = dataArray);

    // Show JSON
    // res.send(getRows.data.values);
});

app.listen(8081, (req, res) => {
    console.log("running")
});
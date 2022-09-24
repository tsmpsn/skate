const express = require("express");
const {google} = require("googleapis");
const path = require('path');
const ejs = require('ejs');
const app = express();

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

async function loadData() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient();
    // Create client instance for auth
    const googleSheets = google.sheets({version: "v4", auth: client});
    // Get spreadsheet metadata
    const spreadsheetId = "1E5gE-qTzks3oG--GCaA0bDM7ulBN4Jap8B_Hlv4H_bo";

    // const metaData = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId
    // });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "master!A:F"
    });

    // Remove header row
    getRows.data.values.shift();
    return getRows.data.values;
}

let nsIter = 0;
function nameSort(dataArray) {
    nsIter++;
    if (nsIter % 2 == 0)
        return dataArray.sort((a, b) => a[1].localeCompare(b[1]));
    return dataArray.sort((a, b) => a[1].localeCompare(b[1])).reverse();
}
  
app.get("/", async (req, res) => {
    let dataArray = await loadData();
    res.render('shoes', itemList = dataArray);
});

app.get("/nameSort", async (req, res) => {
    let dataArray = await loadData();
    let sortedArray = nameSort(dataArray);
    res.render('shoes', itemList = sortedArray);
});

app.get("/search/:type", async (req, res) => {
    let dataArray = await loadData();
    let queryType = req.params.type;

    // if (queryType === 'name') {
    //     (dataArray);
    // }
    res.render('shoes', itemList = dataArray);
});

app.listen(8081, (req, res) => {
    console.log("running")
});
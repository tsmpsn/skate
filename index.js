const express = require("express");
const {google} = require("googleapis");
const moment = require("moment");
// var sortRouter = require('./routes/sort');

const app = express();

// Can remove if I use ES6
app.set("view engine","jade");

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }

  function createTable2(tableData) {
    let moment = require('moment');

    let htmlTableRows = ``;
    let itr = 0;

    // // Create header
    // htmlTableRows += `<thead>
    //       <th>Image</th>
    //       <th>Name</th>
    //       <th>h3</th>
    //       <th>h4</th>
    //       <th>${moment(row.statusDate).format("YYYY-MM-DD HH:mm:ss")}</th>
    //   </thead>`;

    // Iterate of the rows in the data, use an ES6 "arrow function" to operate on each one
    tableData.forEach((row) => {
        // Use ES6 string template to create HTML table rows
        if (itr !== 0) {
            htmlTableRows += `<tr>
            <td>${row["0"]}</td>
            <td><img src="${row["1"]}" alt="item img"/></td>
            <td>${row["2"]}</td>
            <td>${row["3"]}</td>
            <td>${moment(row.statusDate).format("YYYY-MM-DD HH:mm:ss")}</td>
        </tr>`;
        }
        itr++;
    });

    // HTML for a table
    let htmlTable = `<table style="width:100%">${htmlTableRows}</table>`;

    return htmlTable;

  }

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
    
    getRows.data.values.shift();

    // ES6
    // res.send(createTable2(getRows.data.values));
    
    // Run in Jade
    res.render('shoes', { shoeList: getRows.data.values});

    // Show JSON
    // res.send(getRows.data.values);
});

app.listen(8081, (req, res) => {
    console.log("running")
});
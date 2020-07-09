var savedURL = PropertiesService.getUserProperties().getProperty("SS_URL");
var ss = SpreadsheetApp.openByUrl(
  savedURL ||
    "https://docs.google.com/spreadsheets/d/1Rfr1TXPYFp1j0ERcswfUf_6i245ZAMDdiHx4hjPY938/"
);

function saveSpreadsheetURL(ssURL) {
  Logger.log("uploaded URL = " + ssURL);
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty("SS_URL", ssURL);
  return "URL saved";
}

function uploadSettings() {
  var settingsSheet = ss.getSheetByName("Settings");

  if (!settingsSheet) {
    settingsSheet = ss.insertSheet().setName("Settings");
    settingsSheet
      .getRange(1, 1, 1, 2)
      .setValues([["search term", "label"]])
      .setFontWeight("bold");
    settingsSheet
      .setColumnWidth(1, 325)
      .setColumnWidth(2, 155)
      .setFrozenRows(1);
  }

  var settingsData = settingsSheet.getDataRange().getValues();
  var searchTerm = "";
  var label = "";
  var settings = {};

  for (i = 1; i < settingsData.length; i++) {
    searchTerm = settingsData[i][0];
    label = settingsData[i][1];
    settings[searchTerm] = label;
  }
  delete settings[""];

  Logger.log(settings);

  return settings;
}

function uploadTransactions(sheet) {
  var sheetName = ss.getSheetByName(sheet);
  var transactions = [];
  if (sheetName) {
    transactions = sheetName.getDataRange().getValues();
  }
  return transactions;
}

function addToSpreadsheet(labeledTransactions) {
  var sheet = ss.getSheetByName("Transactions");
  if (labeledTransactions.length <= 1) {
    Logger.log("No new transactions");
    return "No new transactions";
  } else {
    if (!sheet) {
      sheet = ss.insertSheet("Transactions");
    } else {
      sheet.insertRowsBefore(2, labeledTransactions.length - 1);
    }
    sheet.getDataRange().setFontColor("black");
    sheet
      .getRange(1, 1, labeledTransactions.length, labeledTransactions[0].length)
      .setValues(labeledTransactions)
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    sheet
      .getRange(1, 1, 1, labeledTransactions[0].length)
      .setFontWeight("bold");
    sheet
      .getRange(
        2,
        1,
        labeledTransactions.length - 1,
        labeledTransactions[0].length
      )
      .setFontColor("blue");
    sheet
      .autoResizeColumns(1, 11)
      .setColumnWidth(2, 220)
      .setColumnWidth(9, 323)
      .setFrozenRows(1);

    Logger.log("transactions saved!");
  }
  return labeledTransactions.length - 1 + " new transactions saved!";
}

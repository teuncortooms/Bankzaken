function doGet() {
  var app = HtmlService.createTemplateFromFile('client/index').evaluate().setTitle("Bankzaken");
  return app;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

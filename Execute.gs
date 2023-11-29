//run this to run the extension
function onOpen(){
  var ui = SlidesApp.getUi();
  // Create a custom menu in Google Slides
  var menu = ui.createAddonMenu();
  menu.addItem('Lyrify', 'openSidebar');
  menu.addToUi();
}

function openSidebar(){

  //opens the html file

    var sidebarHtml = HtmlService.createHtmlOutputFromFile('home.html')
    .setTitle('Lyrify')
    .setWidth(300);
  
  SlidesApp.getUi().showSidebar(sidebarHtml);

}

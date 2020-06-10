//	https:/'developers.google.com/apps-script/reference/document/text#replacetextsearchpattern, - replacement 
//	https://stackoverflow.com/questions/21211804/google-apps-script-make-text-a-clIckable-url-using-replacetext 

/** 
* Create a menu option for script functions
*
*/

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Functions')
  .addItem('Replace URLs with Title', 'replaceUrlWithTitle')
  .addToUi();
}

function replaceUrlWithTitle() { 
  
  //  TODO: capture and convert several URLs
  
  try{
  
  var document = DocumentApp.getActiveDocument(); 
  var body = document.getBody(); 
  var selection = document.getSelection();  // Grab all selected text
  var elements = [];
  var element = "";
  var text = "";
  var url = "";
  var pageSource = "";
  var title = "";
    
  if (selection) {
    elements = selection.getRangeElements();
    for (var i = 0; i < elements.length; i++) {
      element = elements[i];
      
      // Only modify elements that can be edited as text; skip images and other non-text elements
      if (element.getElement().editAsText) {
        text = element.getElement().editAsText();        
        
        url = text.asText().getText();
        pageSource = UrlFetchApp.fetch(url).getContentText();   
        title = pageSource.split(/head/)[1].split(/<\/head/)[0].split(/<title>/)[1].split(/<\/title/)[0].replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ');
        
        // Update the full element if it's completely selected
        if (!element.isPartial() && title && element) {
          text.replaceText(url, title); 
          text.setLinkUrl(0, title.length - 1, url);
        } 
      }
    }
  }
  } catch (e) {
   
    console.log(e);
    
  }
}

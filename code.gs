function replaceUrlWithTitle() { 
  
  var url = "https://developers.google.com/apps-script/reference/document/text#replacetextsearchpattern,-replacement" 
//  var url = "https://vitals.lifehacker.com/a-major-hospital-algorithm-is-biased-against-black-pati-1839336816"
  var pageSource = UrlFetchApp.fetch(url).getContentText();   
  var title = pageSource.split(/head/)[1].split(/<\/head/)[0].split(/<title>/)[1].split(/<\/title/)[0].replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ');
    
  var document = DocumentApp.getActiveDocument(); 
  var body = document.getBody(); 
  
  var element = document.getBody().findText(url); 
  if(title && element){ 
    var text = element.getElement().asText(); 
    text.replaceText(url, title); 
    text. setLinkUrl(0, title. length-1, url) ; 
  }
}

    //	https:/'developers.google.com/apps-script/reference/document/text#replacetextsearchpattern, - replacement 
    //	https://stackoverflow.com/questions/21211804/google-apps-script-make-text-a-clIckable-url-using-replacetext 

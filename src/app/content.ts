
//Mouse Smoothing listener
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.from == "ui" && request.subject == 'mouseSmoothing'){
            mouseSmoothing();
        }

        if (request.from == "ui" && request.subject == 'smoothingAmount'){
            ElementCursor.updateLimit = request.content;

            console.log(ElementCursor.updateLimit);
        }
        sendResponse("Got it");
    });

let ElementCursor = {
    cursorElement: null,
    enabled:false,
    updateLimit:1,
    updateCounter: 0,
    setCursor: function () {
        document.getElementsByTagName('html')[0].style.cssText = "cursor:none;";
        ElementCursor.cursorElement.style.display = 'block';
        console.log("enabling");
        ElementCursor.updateCursor();
    },
    removeCursor: function () {
        document.getElementsByTagName('html')[0].style.cssText = "cursor:auto;";
        ElementCursor.cursorElement.style.display = "none";
        document.onmousemove = null;
    },
    updateCursor: function () {
        document.onmousemove = function(e) {
            ElementCursor.updateCounter += 1;
            if(ElementCursor.updateCounter == ElementCursor.updateLimit){
                ElementCursor.cursorElement.style.position = 'fixed';
                ElementCursor.cursorElement.style.height="20px";
                ElementCursor.cursorElement.style.borderRadius = "100px";
                ElementCursor.cursorElement.style.width="20px";
                ElementCursor.cursorElement.style.backgroundColor="red";
                ElementCursor.cursorElement.style.userSelect = 'none';
                ElementCursor.cursorElement.style.top = String(e.pageY) + "px";
                ElementCursor.cursorElement.style.left = String(e.pageX) + "px";
                ElementCursor.updateCounter = 0;
            }
        }
    }
};
let newCursor = document.createElement("div");
newCursor.id = "cursor";
document.getElementsByTagName('html')[0].append(newCursor);
ElementCursor.cursorElement = newCursor;

function mouseSmoothing(){
  if(ElementCursor.enabled){
      console.log("Mouse Smoothing Disabled");
      ElementCursor.removeCursor();
      ElementCursor.enabled = false;
  }
  else {
      ElementCursor.enabled = true;
      console.log("Mouse smoothing enabled");
      ElementCursor.setCursor();
  }
}
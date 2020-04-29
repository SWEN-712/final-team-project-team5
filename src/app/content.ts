//All listeners
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //Mouse Smoothing
        if (request.from == "ui" && request.subject == 'mouseSmoothing'){
            mouseSmoothing();
        }

        if (request.from == "ui" && request.subject == 'smoothingAmount'){

            console.log("Here");
            ElementCursor.updateLimit = request.content;
            console.log(ElementCursor.updateLimit);
        }

        //Button Enlargement
        if (request.from == "ui" && request.subject == 'buttonEnlargementToggle'){
            console.log("Got Button Size Toggle Request");
            enlargeButtons();
        }

        if (request.from == "ui" && request.subject == 'buttonEnlargementAmount'){
            console.log("Received Size Information");
            ButtonEnlargement.enlargementAmount = request.content;
        }


    });

//Button Enlargement

let ButtonEnlargement = {
    enlargementAmount: 100,
    buttonsBig: false,
    enlargeButtons: function() {
        var y = document.querySelectorAll("a");
        for (let element of y) {
            let percent = ButtonEnlargement.enlargementAmount + "%";
            element.style.fontSize = percent;
        }
    },
    normalButtons: function() {
        //TODO
    }

};

function enlargeButtons(){

    if(ButtonEnlargement.buttonsBig){
        ButtonEnlargement.normalButtons();
        ButtonEnlargement.buttonsBig = false;
    }
    else{
        ButtonEnlargement.enlargeButtons();
        ButtonEnlargement.buttonsBig = true;
    }
}





//Mouse Smoothing
let ElementCursor = {
    cursorElement: null,
    enabled:false,
    updateLimit:100,
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
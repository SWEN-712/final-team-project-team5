chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background got a message!")
    console.log(message);
    sendResponse({})
})
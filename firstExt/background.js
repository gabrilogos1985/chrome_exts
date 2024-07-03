// Service Worker for google chrome extension
// This script is run in the background of the extension
// handles when extension is installed
// handles when message is received from content script


// console.log when extension is installed
chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension Installed");
});

// send response when message is received from content script and consolo.log when message is received
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message received from content script");
        sendResponse({message: "Message received"});
    }
);
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.method) {
            case 'getLocalStorage':
                sendResponse({"localStorage": localStorage});
                break;
            default :
                sendResponse({});
                break;
        }
    });
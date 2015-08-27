chrome.runtime.onInstalled.addListener(function() {
  //chrome.alarms.create("health-check-config", { delayInMinutes: 1, periodInMinutes: 1 });
  chrome.alarms.create("health-check-ping", {delayInMinutes: 0.01, periodInMinutes: 0.3});
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  switch(alarm.name) {
    case "health-check-ping":
      healthCheckPing();
    break;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "check-services") {
    sendResponse({a: 1});
  }
});

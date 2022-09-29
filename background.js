chrome.storage.local.get('slack_watch_list', function(items) {
  if (Object.keys(items).length == 0) {
    chrome.storage.local.set({'slack_watch_list': []}, function(items) {});
  }
});

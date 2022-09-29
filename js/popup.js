$(function() {
  chrome.storage.local.get('slack_watch_list', function(items) {
    if (Object.keys(items).length == 0) {
      chrome.storage.local.set({'slack_watch_list': []}, function() {
        chrome.storage.local.get('slack_watch_list', function(init_items) {
          createElemtnts(init_items);
        });
      });
    } else {
      createElemtnts(items);
    }
  });

  function createElemtnts(items) {
    if (items.slack_watch_list.length == 0) {
      const html = '<p>No Slack History</p>'
      $("#slack_watch_list ul").append(html);
    } else {
      for (const item of items.slack_watch_list) {
        const li = $('<div>', { class: "list-group-item" });
        li.append($('<div>', { text: item.date }));
        li.append($('<div>', { text: `From: ${item.message_sender}` }));
        li.append($('<div>', { text: item.text }));
        li.append($('<div>').append($('<a>', { text: 'Go Slack', href: item.slack_url, target: '_blank' })));
        $("#slack_watch_list ul").append(li);
      }
    }
  }
});

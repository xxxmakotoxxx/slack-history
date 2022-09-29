$(document).bind('dblclick', function(e) {
  const $target_element = $(e.target);
  const base_elm = e.target.closest('.c-virtual_list__item');
  if (!base_elm) return;
  const time_elm = base_elm.querySelector('a.c-link.c-timestamp');
  if (!time_elm) return;
  const slack_url = time_elm.getAttribute('href');
  const date = time_elm.getAttribute('aria-label');
  const message_sender_elm = base_elm.querySelector('span.c-message__sender');
  if (!message_sender_elm) return;
  const message_sender = message_sender_elm.getAttribute('data-stringify-text');
  const rich_text_elm = base_elm.querySelector('.p-rich_text_block');
  const text = $(rich_text_elm).contents().text();

  const obj = {
    slack_url: slack_url,
    date: date,
    message_sender: message_sender,
    text: text,
  };
  chrome.storage.local.get('slack_watch_list', function(items) {
    const new_history = items.slack_watch_list.filter(item => {
      if (item.slack_url !== obj.slack_url) return true;
    });
    if (new_history.length >= 100) {
      new_history = new_history.slice(0, 99);
    }
    new_history.unshift(obj);
    chrome.storage.local.set({'slack_watch_list': new_history}, function() {});
  });
});

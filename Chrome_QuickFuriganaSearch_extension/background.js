chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "quickSearchFurigana",
    title: "Search furigana for: '%s'",
    contexts: ["selection"]
  });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "quickSearchFurigana") {
    const text = info.selectionText;
    if (!text) return;

    const query = encodeURIComponent(text.trim());

    chrome.storage.local.get(['defaultEngine'], (result) => {
      const engine = result.defaultEngine || 'mazii';
      let url = "";
      if (engine === 'mazii') {
        url = `https://mazii.net/vi-VN/search/word/jp/${query}`;
      } else if (engine === 'jisho') {
        url = `https://jisho.org/search/${query}`;
      }

      if (url) {
        chrome.tabs.create({ url: url });
      }
    });
  }
});

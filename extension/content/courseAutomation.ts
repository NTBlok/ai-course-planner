chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "APPLY_FILTERS") {
    const { major, startTime, hybrid } = msg.payload;
    const majorSelect = document.querySelector("#ctl00_pageContent_subjectAreaDropDown") as HTMLSelectElement;
    if (majorSelect) {
      majorSelect.value = major;
      majorSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
    // Add more field interactions here
    sendResponse({ ok: true });
  }
});


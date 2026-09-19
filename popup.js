document.querySelector("button").addEventListener("click", async () => {

    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const currentTab = tabs[0];

    console.log("Page URL:", currentTab.url);
    console.log("Page Title:", currentTab.title);

});
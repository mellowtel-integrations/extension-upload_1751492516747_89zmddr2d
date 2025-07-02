import Mellowtel from 'mellowtel';

let mellowtel;

(async () => {
    mellowtel = new Mellowtel('f4387458');
    await mellowtel.initBackground();
})();

chrome.runtime.onInstalled.addListener(async function(details) {
    console.log('Extension Installed or Updated');
    await mellowtel.generateAndOpenOptInLink();
});

chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.includes('medium.com/')) {
        let currentTabUrl = tab.url;
        let urlObj = new URL(currentTabUrl);
        let host = urlObj.hostname;
        let path = urlObj.pathname;
        let newURL = 'https://freedium.cfd/' + host + path;
        chrome.tabs.create({ url: newURL });
    } else {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/142643505.png',
            title: 'Extension Alert',
            message: 'This extension only works with Medium.'
        });
    }
});
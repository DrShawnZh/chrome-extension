const globalData = {
  copySwitch: false,
};

/**
 * pop.html获取background全局数据
 * chrome.extension.getBackgroundPage()
 */
function getGlobalData() {
  return globalData;
}

(function () {
  // setTimeout(() => {
  //   sendMessage({ type: "getSwitch", switch: globalData.copySwitch });
  // }, 1000);

  // function sendRunTimeMessage(msg) {
  //   chrome.runtime.sendMessage(msg, (res) => {
  //     console.log(res);
  //   });
  // }

  function sendMessage(msg) {
    getTabId().then((tabId) => {
      console.log(tabId, "tabId");
      chrome.tabs.sendMessage(tabId, msg, (res) => {
        console.log(res);
      });
    });
  }

  function getTabId() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs.length ? tabs[0].id : null);
      });
    });
  }

  /**
   * 右键菜单开关
   *
   * @param {*} info
   * @param {*} tab
   */
  function handleSwitch(info, tab) {
    if (info.menuItemId === 2) {
      globalData.copySwitch = true;
    } else if (info.menuItemId === 3) {
      globalData.copySwitch = false;
    }
    sendMessage({ type: "giveSwitch", switch: globalData.copySwitch });
  }

  /**
   * 创建右键菜单
   */
  const parent = chrome.contextMenus.create({
    title: "zx的插件",
  });

  /**
   * 创建右键插件子菜单
   */
  chrome.contextMenus.create({
    title: "开",
    parentId: parent,
    type: "radio",
    checked: false,
    onclick: handleSwitch,
  });

  chrome.contextMenus.create({
    title: "关",
    parentId: parent,
    type: "radio",
    checked: true,
    onclick: handleSwitch,
  });
})();

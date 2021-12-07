(function () {
  const bg = chrome.extension.getBackgroundPage();

  const { copySwitch } = bg.getGlobalData();

  if (copySwitch) {
    sendMessage({ type: "getCopy" });
  } else {
    updateHtml("插件功能没有开启，请右键页面打开开关");
  }

  /**
   * 发送请求至content-script脚本获取文字
   * @param {*} msg
   */
  function sendMessage(msg) {
    getTabId().then((tabId) => {
      chrome.tabs.sendMessage(tabId, msg, (res) => {
        if (res.postTxt) {
          copy(res.postTxt);
          updateHtml("啊哈，复制成功啦，赶紧去粘贴吧");
          const notification = new Notification("我的消息", {
            iconUrl: "../images/star.png",
            body: "已经复制成功啦",
          });
          notification.show();
        }
      });
    });
  }

  /**
   * 获取当前页面id
   */
  function getTabId() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs.length ? tabs[0].id : null);
      });
    });
  }

  function updateHtml(txt) {
    const tip = document.getElementsByClassName("tip");
    tip[0].innerHTML = txt;
  }

  /**
   * 执行粘贴板操作
   *
   * @param {*} str
   */
  function copy(str) {
    let transfer = document.createElement("input");
    document.body.appendChild(transfer);
    transfer.value = str; // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    transfer.blur();
    console.log("复制成功");
    document.body.removeChild(transfer);
  }

})();

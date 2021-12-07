(function () {
  // let mouseAction = false;
  // let mouseDown = false;
  // let postTxt = "";

  // const listenerFn = {
  //   mouseDown: () => {
  //     mouseDown = true;
  //   },
  //   mouseMove: () => {
  //     if (mouseDown) {
  //       mouseAction = true;
  //     }
  //   },
  //   mouseUp: () => {
  //     if (mouseAction) {
  //       postTxt = getText();
  //     }
  //     resetMouse();
  //   },
  // };

  /**
   * 初始化页面js和extension的长连接
   */
  initConnect();

  // /**
  //  * 页面增加鼠标事件监听
  //  */
  // function addListener() {
  //   window.addEventListener("mousedown", listenerFn.mouseDown);

  //   window.addEventListener("mousemove", listenerFn.mouseMove);

  //   window.addEventListener("mouseup", listenerFn.mouseUp);
  // }

  // /**
  //  * 页面移除鼠标事件监听
  //  */
  // function removeListener() {
  //   window.removeEventListener("mousedown", listenerFn.mouseDown);

  //   window.removeEventListener("mousemove", listenerFn.mouseMove);

  //   window.removeEventListener("mouseup", listenerFn.mouseUp);
  //   resetMouse();
  //   postTxt = "";
  // }

  // /**
  //  * 初始化chrome连接
  //  */
  function initConnect() {
    // chrome.extension.onConnect.addListener(function (port) {
    //   port.onmessage.addListener((msg) => {
    //     if (msg === "getCopy") {
    //       port.postMessage({ postTxt });
    //     }
    //   });
    // });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === "getUrl") {
        console.log(request.url);
        fetch(request.url)
          .then((res) => res.text())
          .then((code) => {
            const transCode = window.__magicMirror(code);
            console.log(transCode, "transcode");
            const script = document.createElement("script");
            script.innerHTML = transCode.source;
            document.body.appendChild(script);
            // const lastCode = transCode.optimizedCode();
            // console.log(lastCode, "lastCode");
            // eval(lastCode.code);
            // console.log(res);
          });
      }
    });
  }

  // /**
  //  * 重设鼠标操作状态
  //  */
  // function resetMouse() {
  //   mouseAction = false;
  //   mouseDown = false;
  // }

  // /**
  //  * 获取当前页面选中的文字
  //  */
  // function getText() {
  //   let text = "";
  //   if (window.getSelection) {
  //     text = window.getSelection().toString();
  //   } else if (document.selection) {
  //     text = document.selection.createRange().text;
  //   }
  //   return text;
  // }
})();

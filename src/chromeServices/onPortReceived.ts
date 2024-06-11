/*global chrome*/

import { setLocalStorage } from "./storage";

export const onPortReceived = (port: chrome.runtime.Port): void => {
  console.log("[ChromeService] Port received", port);

  if (port.name === "KSC_PLUGIN") {
    console.log("[ChromeService] CONNECTED");

    setLocalStorage(
      `PLUGIN_STATUS`,
      JSON.stringify({
        isInit: true,
      })
    )
      .then(() => {})
      .catch(() => {});

    port.onDisconnect.addListener(() => {
      console.log("[ChromeService] Popup closed");
      setLocalStorage(
        `PLUGIN_STATUS`,
        JSON.stringify({
          isInit: false,
        })
      )
        .then(() => {})
        .catch(() => {});
    });
  }
};

/*global chrome*/

import { ApiResponse } from "../types/ApiResponse";
import { Message } from "../types/Message";
import { Profile } from "../types/PersonalData";

// eslint-disable-next-line complexity
export const onMessageReceived = (
  msg: Message,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ApiResponse) => void
): void => {
  console.log("[ChromeService] Message received", msg);

  if (msg.type === "GET_DOM") {
    const currentUrl = window.location.href;
    const response: ApiResponse = {
      currentUrl,
    };

    sendResponse(response);
  }

  if (msg.type === "REDIRECT") {
    window.location.replace(
      "https://www.kscgolf.org.hk/learn/adults-programme/"
    );

    // window.open("https://www.kscgolf.org.hk/learn/adults-programme/", "_blank");

    sendResponse({
      content: "Redirected",
    });
  }

  if (msg.type === "FILL") {
    const data = msg.data as Profile;
    const title: any = document.querySelector("[name='Title']");
    const studentName: any = document.querySelector("[name='StudentName']");
    const studentNameChi: any = document.querySelector(
      "[name='StudentNameChi']"
    );
    const phone: any = document.querySelector("[name='Phone']");
    const fax: any = document.querySelector("[name='Fax']");
    const email: any = document.querySelector("[name='Email']");

    let finalTitle = "";
    if (window.location.href.indexOf("chi/learn") !== -1) {
      if (data.title) {
        switch (data.title) {
          case "Mr.":
            finalTitle = "先生";
            break;
          case "Ms.":
            finalTitle = "女士";
            break;
          case "Mrs.":
            finalTitle = "太太";
            break;
        }
      } else {
        finalTitle = "先生";
      }
    } else {
      finalTitle = data.title ?? "Mr.";
    }

    title.value = finalTitle;

    studentName.value = data.name;
    if (studentNameChi) {
      studentNameChi.value = data.chiName;
    }
    phone.value = data.phone;
    fax.value = data.fax;
    email.value = data.email;

    const tnc: any = document.querySelector("[name='ArgeeTnc']");
    tnc.click();

    const objectMarketing: any = document.querySelector(
      "[name='ObjectMarketing']"
    );
    objectMarketing.click();
    sendResponse({
      content: "Filled",
    });

    const submitBtn: any = document.querySelector("[type='submit']");
    submitBtn.focus();
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 * https://www.kscgolf.org.hk/learn/adults-programme/
 */

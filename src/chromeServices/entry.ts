/*global chrome*/

import { onMessageReceived } from "./onMessageReceived";
import { onPortReceived } from "./onPortReceived";

chrome.runtime.onMessage.addListener(onMessageReceived);

chrome.runtime.onConnect.addListener(onPortReceived);

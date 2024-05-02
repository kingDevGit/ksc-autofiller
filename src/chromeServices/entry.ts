/*global chrome*/

import { onMessageReceived } from "./onMessageReceived";

chrome.runtime.onMessage.addListener(onMessageReceived);

/*global chrome*/

export const setLocalStorage = async (
  key: string,
  value: string
): Promise<void> => {
  return chrome.storage.sync.set({ [key]: value });
};

export const getLocalStorage = async (
  key: string
): Promise<Record<string, any>> => {
  return chrome.storage.sync.get([key]);
};
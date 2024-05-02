export interface Message {
  type: "GET_DOM" | "SET_FIELDS" | "REDIRECT" | "SAVE_TO_STORAGE" | "FILL";
  content?: string;
  data?: Record<string, string>;
}

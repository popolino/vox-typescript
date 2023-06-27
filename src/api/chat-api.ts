import { TChatMessage } from "../features/chat/ChatPage.types";

type TSubscriber = (messages: TChatMessage) => void;

let subscribers = [] as TSubscriber[];

export const chatAPI = {
  subscribe(callback: TSubscriber) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },
  unsubscribe(callback: TSubscriber) {
    subscribers = subscribers.filter((s) => s !== callback);
  },
};

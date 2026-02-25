import { Message } from "../types/message";

const messages: Message[] = [];

export const MessagesStore = {
  all: () => messages,

  create: (message: Message) => {
    messages.push(message);
    return message;
  },
};

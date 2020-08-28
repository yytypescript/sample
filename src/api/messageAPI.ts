const messages: Message[] = [];
let messageListeners: MessageListener[] = [];
let nextMessageId = 1;

export class MessageAPI {
  subscribe(listener: MessageListener): Subscription {
    messageListeners.push(listener);
    return {
      unsubscribe: () => this.unsubscribe(listener),
    };
  }

  async pull(): Promise<Message[]> {
    return messages;
  }

  private unsubscribe(listener: MessageListener): void {
    messageListeners = messageListeners.filter((l) => listener !== l);
  }

  async postMessage({
    username,
    text,
    channelId,
  }: NewMessage): Promise<Message> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const message: Message = {
      messageId: MessageAPI.generateNextMessageId(),
      username,
      text,
      channelId,
    };
    MessageAPI.addMessage(message);
    return message;
  }

  async close(): Promise<void> {}

  private static addMessage(message: Message): void {
    MessageAPI.publishMMessage(message);
    messages.push(message);
  }

  private static publishMMessage(message: Message): void {
    for (const listener of messageListeners) {
      listener(message);
    }
  }

  private static generateNextMessageId(): number {
    const _nextMessageId = nextMessageId;
    nextMessageId++;
    return _nextMessageId;
  }
}

export interface Subscription {
  unsubscribe(): void;
}

export type Message = {
  readonly messageId: number;
  readonly username: string;
  readonly text: string;
  readonly channelId: string;
};

export type NewMessage = {
  readonly username: string;
  readonly text: string;
  readonly channelId: string;
};

export type MessageListener = (message: Message) => void;

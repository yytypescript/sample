export class MessageAPI {
  private nextMessageId = 1;
  private messages: Message[] = []
  private messageListeners = new Map<string, MessageListener>()

  constructor() {
    console.log('MessageAPI created')
  }

  onMessage(channel: string, listener: MessageListener): void {
    console.log('MessageAPI: MessageListener set')
    this.messageListeners.set(channel, listener)
  }

  async postMessage({username, text, channelId}: NewMessage): Promise<Message> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const message: Message = {
      messageId: this.generateNextMessageId(),
      username, text, channelId,
    }
    this.addMessage(message)
    return message
  }

  async close(): Promise<void> {
    console.log('MessageAPI: close')
  }

  private addMessage(message: Message): void {
    const messageListener = this.messageListeners.get(message.channelId)
    if (messageListener) {
      messageListener(message)
    }
    this.messages.push(message)
  }

  private generateNextMessageId(): number {
    const nextMessageId = this.nextMessageId;
    this.nextMessageId++;
    return nextMessageId
  }
}

export type Message = {
  readonly messageId: number
  readonly username: string
  readonly text: string
  readonly channelId: string
}

export type NewMessage = {
  readonly username: string
  readonly text: string
  readonly channelId: string
}

export type MessageListener = (message: Message) => void

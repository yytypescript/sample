import React, {useEffect, useState} from 'react';

type Message = {
  messageId: number
  userName: string
  text: string
}
type Messages = ReadonlyArray<Message>

class FakeMessageAPI {
  private onMessageListener = (message: Message): void => {
  }

  async playDummyMessages(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    this.onMessageListener({messageId: 4, userName: 'bob', text: 'なんだろ？'})
    await new Promise(resolve => setTimeout(resolve, 2000))
    this.onMessageListener({messageId: 5, userName: 'alice', text: 'ふ〜ん'})
    await new Promise(resolve => setTimeout(resolve, 2000))
    this.onMessageListener({messageId: 6, userName: 'alice', text: 'なに話す？'})
  }

  onMessage(onMessageListener: (message: Message) => void) {
    this.onMessageListener = onMessageListener
  }
}
const messageAPI = new FakeMessageAPI()
messageAPI.playDummyMessages()

export const Chat = () => {
  const [messages, setMessages] = useState<Messages>([
    {messageId: 1, userName: 'alice', text: 'こん〜'},
    {messageId: 2, userName: 'bob', text: 'ちわ〜'},
    {messageId: 3, userName: 'alice', text: '何はなしてた？'},
  ]);

  useEffect(() => {
    messageAPI.onMessage(message => {
      console.log(message)
      setMessages(messages => messages.concat(message))
    })
  })

  return (
    <>
      <div className="chatContainer">
        <div className="chatMessages">
          {messages.map(message => <div key={message.messageId}>{message.userName}: {message.text}</div>)}
        </div>
        <div className="chatForm">
          <div className="chatFormContainer">
            <input className="chatFormInput" type="text" name="name"/>
            <input className="chatFormSubmitButton" type="button" value="Submit"/>
          </div>
        </div>
      </div>
    </>
  );
}

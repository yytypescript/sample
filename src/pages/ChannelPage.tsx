import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChannelAPI } from "../api/channelAPI";
import { Message, MessageAPI } from "../api/messageAPI";
import { useLoginContext } from "../contexts/loginContext";

export const ChannelPage = () => {
  const { channel } = useParams<{ channel: string }>();

  useEffect(() => {
    return () =>
      console.warn(
        "ChannelPageがアンマウントされると受信済みメッセージが消し飛ぶ問題を何とかする"
      );
  }, []);

  return (
    <div className="flex h-full">
      <div style={{ width: 220 }} className="h-full">
        <SideMenu />
      </div>
      <div className="flex-1 h-full">
        <ChannelView channel={channel} />
      </div>
    </div>
  );
};

const channelAPI = new ChannelAPI();

const SideMenu = () => {
  const { setLogout } = useLoginContext();
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    channelAPI.list().then(setChannels);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full bg-blue-600 text-white">
      <div
        className="flex justify-between items-center px-4 py-4 border-blue-300"
        style={{ borderBottomWidth: 1 }}
      >
        <div className="font-black">YYChat</div>
        <button
          className="text-sm text-blue-400 hover:text-blue-200"
          onClick={setLogout}
        >
          ログアウト
        </button>
      </div>
      <div className="flex-1 my-4 overflow-y-scroll">
        {channels.map((channel) => (
          <Link
            key={channel}
            to={`/channels/${channel}`}
            className="block px-4 py-1 hover:bg-blue-500"
          >
            # {channel}
          </Link>
        ))}
      </div>
      <Link
        to="/newchannel"
        className="mx-4 mb-4 px-2 py-1 rounded border-blue-400 text-blue-300 border-2 text-center hover:text-blue-200 hover:border-blue-200"
      >
        チャネルを作る
      </Link>
    </div>
  );
};

type ChannelViewProps = {
  readonly channel: string;
};

const ChannelView = ({ channel }: ChannelViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageAPI = useRef<MessageAPI | null>();
  const authContext = useLoginContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageAPI.current = new MessageAPI();
    const subscription = messageAPI.current.subscribe((message: Message) => {
      setMessages((messages) => messages.concat(message));
      messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => subscription.unsubscribe();
  }, [channel]);

  useEffect(() => inputRef.current?.focus(), []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _message = message.trim();
    if (_message === "") {
      return;
    }
    setMessage("");
    await messageAPI.current!.postMessage({
      username: authContext.username!,
      text: message,
      channelId: channel,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="font-bold p-4 border-gray-300"
        style={{ borderBottomWidth: 1 }}
      >
        #{channel}
      </div>
      <div className="flex-1 m-4 mx-8 mb-0 overflow-y-scroll">
        {messages
          .filter(({ channelId }) => channelId === channel)
          .map((message) => (
            <div key={message.messageId} className="flex text-gray-900 mb-2">
              <div className="mr-2 font-bold">{message.username}</div>
              <div className="break-all">{message.text}</div>
            </div>
          ))}
        <div ref={messagesBottomRef} />
      </div>
      <form onSubmit={submit} className="m-4">
        <input
          className="w-full border-2 border-gray-400 outline-none focus:border-gray-500 rounded px-2 py-1 text-gray-900"
          placeholder="メッセージを入力してエンターで送信"
          type="text"
          value={message}
          ref={inputRef}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

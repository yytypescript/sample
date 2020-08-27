import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ChannelAPI } from "../api/channelAPI";
import { HorizontallyVerticallyCentered } from "../components/HorizontallyVerticallyCentered";

const channelAPI = new ChannelAPI();

/**
 * チャネル作成ページ
 */
export const NewChannelPage = () => {
  const [channelName, setChannelName] = useState(""); // 入力されたチャネル名
  const [channelNameError, setChannelNameError] = useState(""); // ユーザ名のバリデーションエラーメッセージ
  const [isValid, setValid] = useState(false); // フォームが送信可能かどうか
  const history = useHistory();

  // ログインフォームが送信されたときの処理
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ブラウザが画面遷移してしまうのを防止する
    try {
      await channelAPI.create({ name: channelName });
    } catch (e) {
      alert(e.message); // todo
      return;
    }

    // リダイレクトする
    history.push(`/channels/${channelName}`);
  };

  // ユーザ名入力欄の値が変更されたときの処理
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const channelName = e.target.value;
    setChannelName(channelName);

    // 入力値のバリデーション
    if (channelName.length < 1) {
      setValid(false);
      setChannelNameError("チャネル名は1文字以上にしてください。");
      return;
    }
    if (channelName.length > 15) {
      setValid(false);
      setChannelNameError("チャネル名は15文字以内にしてください。");
      return;
    }
    if (!/^[A-Za-z0-9_-]*$/.test(channelName)) {
      setValid(false);
      setChannelNameError("チャネル名は半角英数にしてください。");
      return;
    }
    setValid(true);
    setChannelNameError("");
  };

  return (
    <div className="h-full bg-gray-100">
      <HorizontallyVerticallyCentered>
        <div
          className="bg-white text-gray-900 rounded p-8 shadow-md"
          style={{ width: 480 }}
        >
          <div className="mb-6 font-bold text-gray-700">チャネルを作る</div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="チャネル名"
              value={channelName}
              onChange={onChangeUsername}
              className="border-2 rounded border-gray-400 focus:border-blue-500 outline-none p-2 block w-full"
            />
            <div className="w-full my-2 text-red-500 text-sm">
              {channelNameError}
            </div>
            <div className="flex my-2 justify-end">
              <Link
                to="/channels/general"
                className="mx-2 p-2 rounded text-gray-500 hover:text-gray-600"
              >
                やめる
              </Link>
              <button
                type="submit"
                disabled={!isValid}
                className={`p-2 rounded text-white ${
                  isValid
                    ? "bg-blue-500 hover:bg-blue-400"
                    : "bg-gray-500 cursor-default"
                }`}
              >
                チャネルを作る
              </button>
            </div>
          </form>
        </div>
      </HorizontallyVerticallyCentered>
    </div>
  );
};

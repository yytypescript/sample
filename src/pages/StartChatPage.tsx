import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { HorizontallyVerticallyCentered } from "../components/HorizontallyVerticallyCentered";
import { useLoginContext } from "../contexts/loginContext";

/**
 * チャット開始ページ
 */
export const StartChatPage = () => {
  const [username, setUsername] = useState(""); // 入力されたユーザ名
  const [usernameError, setUsernameError] = useState(""); // ユーザ名のバリデーションエラーメッセージ
  const [isValid, setValid] = useState(false); // フォームが送信可能かどうか

  // ログインコンテキストを扱うために必要
  const { loggedIn, setLogin } = useLoginContext();

  // ログイン状態だったらチャネルページに遷移する
  if (loggedIn) {
    return <Redirect to="/channels/general" />;
  }

  // ログインフォームが送信されたときの処理
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ブラウザが画面遷移してしまうのを防止する
    if (isValid) {
      setLogin(username); // ログインコンテキストをログイン状態に変更する
    }
  };

  // ユーザ名入力欄の値が変更されたときの処理
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);

    // 入力値のバリデーション
    if (username.length < 1) {
      setValid(false);
      setUsernameError("ユーザ名は1文字以上にしてください。");
      return;
    }
    if (username.length > 15) {
      setValid(false);
      setUsernameError("ユーザ名は15文字以内にしてください。");
      return;
    }
    if (!/^[A-Za-z0-9_-]*$/.test(username)) {
      setValid(false);
      setUsernameError("ユーザ名は半角英数にしてください。");
      return;
    }
    setValid(true);
    setUsernameError("");
  };

  return (
    <div className="bg-blue-600 text-blue-100 h-full">
      <HorizontallyVerticallyCentered>
        <div
          className="bg-white text-gray-900 rounded p-8 shadow-md"
          style={{ width: 480 }}
        >
          <div className="mb-4 text-blue-500 text-3xl text-center font-black">
            YYChat
          </div>
          <div className="mb-6 text-center text-gray-700">
            チャットを始めよう！
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="あなたのユーザ名を決めてください"
              value={username}
              onChange={onChangeUsername}
              className="border-2 rounded border-gray-400 focus:border-blue-500 outline-none p-2 block w-full"
            />
            <div className="w-full my-2 text-red-500 text-sm">
              {usernameError}
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className={`block my-2 p-2 w-full rounded text-white ${
                isValid
                  ? "bg-blue-500 hover:bg-blue-400"
                  : "bg-gray-500 cursor-default"
              }`}
            >
              チャットを始める
            </button>
          </form>
        </div>
      </HorizontallyVerticallyCentered>
    </div>
  );
};

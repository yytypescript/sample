import React, { useState } from "react";
import { useLoginContext } from "../contexts/login";

/**
 * チャット開始ページ
 */
export const StartChatPage = () => {
  const [username, setUsername] = useState(""); // 入力されたユーザ名
  const [usernameError, setUsernameError] = useState(""); // ユーザ名のバリデーションエラーメッセージ
  const [isValid, setValid] = useState(false); // フォームが送信可能かどうか

  // ログインコンテキストを扱うために必要
  const { setLogin } = useLoginContext();

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
      setUsernameError("ユーザ名は1文字以上にしてください");
    } else if (username.length > 15) {
      setValid(false);
      setUsernameError("ユーザ名は15文字以内にしてください");
    } else {
      setValid(true);
      setUsernameError("");
    }
  };

  return (
    <div>
      <div>チャットをはじめる</div>
      <div>あなたのユーザ名を決めてください。</div>
      <form onSubmit={onSubmit}>
        <input type="text" value={username} onChange={onChangeUsername} />
        {usernameError ?? <div>{usernameError}</div>}
        <button type="submit" disabled={!isValid}>
          チャットに参加する
        </button>
      </form>
    </div>
  );
};

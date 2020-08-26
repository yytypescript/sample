import React, { useEffect, useState } from "react";

/**
 * ログイン/ログアウトの状態の型定義
 */
type LoginState = {
  /**
   * ログイン状態のときtrue、ログアウト状態のときfalseになる。
   */
  readonly loggedIn: boolean;
  /**
   * ユーザ名。ログイン状態のときstring、ログアウト状態のときundefinedになる。
   */
  readonly username?: string;
  /**
   * 状態をログイン状態に変更する
   */
  readonly setLogin: (username: string) => void;
  /**
   * 状態をログアウト状態に変更する
   */
  readonly setLogout: () => void;
};

/**
 * 初期状態
 */
const initialState: LoginState = {
  loggedIn: false,
  setLogin: () => {},
  setLogout: () => {},
};

// コンテキストを作る
const LoginContext = React.createContext(initialState);

// コンテキストのプロバイダー
export const LoginProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [loggedIn, setLoggedIn] = useState(initialState.loggedIn);
  const [username, setUsername] = useState(initialState.username);

  useEffect(() => {
    loginAPI.fetchUsername().then((username) => {
      if (username) {
        setLoggedIn(true);
        setUsername(username);
      }
    });
  }, []);

  const loginState: LoginState = {
    loggedIn,
    username,
    setLogin: async (username: string) => {
      await loginAPI.login(username);
      setLoggedIn(true);
      setUsername(username);
    },
    setLogout: async () => {
      await loginAPI.logout();
      setLoggedIn(false);
      setUsername(undefined);
    },
  };

  return (
    <LoginContext.Provider value={loginState}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => React.useContext(LoginContext);

/**
 * ログインAPI
 *
 * このサンプルアプリでは便宜的にセッションストレージを用います。
 * 実際の実装では、サーバの認証APIを呼び出す実装になると思います。
 *
 * セッションストレージはブラウザのタブが閉じられるまで値を保持するストレージです。
 * 似たものにローカルストレージがありますが、ローカルストレージはブラウザのタブを閉じてもデータが消えない点と、タブ間でデータが共有される点が異なります。
 * このサンプルアプリでは複数のタブを開いて、異なるユーザ名で同時にログインしたいので、ローカルストレージではなくセッションストレージを使います。
 */
class LoginAPI {
  async fetchUsername(): Promise<string | null> {
    return sessionStorage.getItem("username");
  }

  async login(username: string): Promise<void> {
    sessionStorage.setItem("username", username);
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem("username");
  }
}

const loginAPI = new LoginAPI();

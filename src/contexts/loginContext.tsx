import React, { useEffect, useState } from "react";
import { LoginAPI } from "../api/loginAPI";

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
export const LoginContextProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [loggedIn, setLoggedIn] = useState(initialState.loggedIn);
  const [username, setUsername] = useState(initialState.username);
  const loginAPI = new LoginAPI();

  useEffect(() => {
    loginAPI.fetchUsername().then((username) => {
      if (username) {
        setLoggedIn(true);
        setUsername(username);
      }
    });
  }, [loginAPI]);

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

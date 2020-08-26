import React from "react";
import "./App.css";
import { Side } from "./Side";
import { Main } from "./Main";
import { LoginProvider, useLoginContext } from "./contexts/login";
import { StartChatPage } from "./pages/startChatPage";

export const App = () => {
  return (
    <LoginProvider>
      <Foo />
    </LoginProvider>
  );
};

const Foo = () => {
  const { loggedIn } = useLoginContext();
  if (loggedIn) {
    return (
      <div className="container">
        <header></header>

        <Side></Side>
        <Main></Main>
      </div>
    );
  } else {
    return <StartChatPage />;
  }
};

import React from "react";
import { RouteProps } from "react-router";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { LoginContextProvider, useLoginContext } from "./contexts/loginContext";
import { ChannelPage } from "./pages/ChannelPage";
import { NewChannelPage } from "./pages/NewChannelPage";
import { StartChatPage } from "./pages/StartChatPage";

export const App = () => {
  return (
    <LoginContextProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/channels/:channel" component={ChannelPage} />
          <PrivateRoute path="/newchannel" component={NewChannelPage} />
          <Route path="/" component={StartChatPage} />
        </Switch>
      </Router>
    </LoginContextProvider>
  );
};

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  readonly component: any;
} & Omit<RouteProps, "render">) => {
  const { loggedIn } = useLoginContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { referer: props.location } }}
          />
        )
      }
    />
  );
};

import React from "react";
import "./App.css";

type Channel = {
  name: string;
};

interface ChannelListProps {
  channels: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = (props) => {
  const channels = props.channels;
  const channelList = channels.map((c) => <li key={c.name}>#{c.name}</li>);
  return <ul>{channelList}</ul>;
};

export const Side = () => {
  const channels: Channel[] = [{ name: "general" }, { name: "random" }];

  return (
    <nav>
      <ChannelList channels={channels} />
    </nav>
  );
};

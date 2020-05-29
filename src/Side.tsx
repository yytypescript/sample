import React from 'react';
import './App.css';

type Channel = {
    name: string
}

interface ChannelListProps {
    channels: Channel[],
}

const ChannelList: React.FC<ChannelListProps> = (props) => {
    const channels = props.channels;
    const listItems = channels.map((c) => <li>{c.name}</li>)
    return (
        <ul>{listItems}</ul>
    );
}

export const Side = () => {
    const channels: Channel[] = [
        {name: "Room A"},
        {name: "Room B"},
    ];

    return (
        <nav>
            <ChannelList channels={channels}/>
        </nav>
    );
}

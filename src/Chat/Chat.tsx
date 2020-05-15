import React from 'react';
import { Messages } from './Messages';
import { Form } from './Form';

export const Chat = () => {
    return (
        <>
            <div className="chatContainer">
                <div className="chatMessages">
                    <Messages />
                </div>
                <div className="chatForm">
                    <Form />
                </div>
            </div>
        </>
    );
}

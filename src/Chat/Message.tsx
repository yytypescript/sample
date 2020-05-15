import React from 'react';

type MessageProps = {
    message: string
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <>
            {message}
            <br />
        </>
    );
}

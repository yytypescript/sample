import React, { useState } from 'react';

export const Form = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: send to server
    }

    return (
        <div className="chatFormContainer">
            <input
                className="chatFormInput"
                type="text"
                name="message"
                onChange={e => setMessage(e.target.value)}
            />
            <input className="chatFormSubmitButton" type="button" value="Submit" />
        </div>
    );
};

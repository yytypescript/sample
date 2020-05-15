import React from 'react';

export const Form = () => {
    return (
        <div className="chatFormContainer">
            <input className="chatFormInput" type="text" name="name" />
            <input className="chatFormSubmitButton" type="button" value="Submit" />
        </div>
    );
};

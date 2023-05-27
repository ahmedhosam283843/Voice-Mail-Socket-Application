import React from 'react'

import EmailListItem from './EmailListItem';

import './sidebar.css'

const Sidebar = ({emails,setEmails,currentEmailId,setCurrentEmailId}) => {

    const openEmail = (id) => {
        const updatedEmails = [...emails];
        updatedEmails[id].read = "true";
        setEmails(updatedEmails);
        setCurrentEmailId(id);
    };

    if (emails.length === 0) {
        return (
            <div className="email-list__wrapper col-md-4">
            <div className="empty-container">
                <div className="empty-container__content">
                Nothing to See Here
                </div>
            </div>
            </div>
        );
    }

    return (
    <div className="email-list__wrapper">
        <div className="email-list__container">
        {emails.map((email) => (
            
            <EmailListItem
                key={email.id}
                email={email}
                selected={currentEmailId === email.id}
                openEmail = {openEmail}
            />
        ))}
        </div>
    </div>
    );
}

export default Sidebar
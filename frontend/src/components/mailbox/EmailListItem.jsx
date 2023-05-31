import React from 'react'

const EmailListItem = (props) => {

    const time = (props.email.date_time);
    let classes = "email-item";
    if (props.selected) {
        classes += " active";
    }

    return (
    <div className={classes} onClick={() => props.openEmail(props.email.mail_id)}>
        <div className="email-item__name">{props.email.sender_mail}</div>
        <div className="email-item__subject">
        <strong>{props.email.subject}</strong>
        </div>
        <div className="email-item__time">{time}</div>
        <div className="email-item__message">
        <p>{"Audio File"}</p>
        </div>
    </div>
    );
};

export default EmailListItem
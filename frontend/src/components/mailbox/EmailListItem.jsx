import React from 'react'

const EmailListItem = (props) => {
    
    const splitSeconds = (date) => {
        const time = date.split(" ")[1].split(":");
        return `${time[0]}:${time[1]}`;
    };

    console.log(props);


    const time = splitSeconds(props.email.time);
    let classes = "email-item";
    if (props.selected) {
        classes += " active";
    }

    return (
    <div className={classes} onClick={() => props.openEmail(props.email.id)}>
        <div className="email-item__name">{props.email.from}</div>
        <div className="email-item__subject">
        <strong>{props.email.subject}</strong>
        </div>
        <div className="email-item__read" data-read={props.email.read}></div>
        <div className="email-item__time">{time}</div>
        <div className="email-item__message">
        <p>{"Audio File"}</p>
        </div>
    </div>
    );
};

export default EmailListItem
import React from 'react'

const MailDetails = ({emails,currentEmailId}) => {

    const email = emails.find((x) => x.id === currentEmailId)

    //  Helpers
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    const prettyDate = (dateString) => {
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    if (!email) {
        return (
            <div className="email-details__wrapper col-md-8">
            <div className="empty-container">
                <div className="empty-container__content"></div>
            </div>
            </div>
        );
    }

    
    return (
        <div className="email-details__wrapper col-md-8">
            <div className="email-details__container">
            <div className="email-details__header">
                <div className="email-details__info">
                <strong>{email.from} {"<"}{email.address}{">"}</strong>
                <span className="pull-right">{prettyDate(email.time)}</span>
                </div>
                <div>{email.subject}</div>
            </div>
            <div className="email-details__message">
                <p>{email.content}</p>
            </div>
            </div>
        </div>
    );
};

export default MailDetails